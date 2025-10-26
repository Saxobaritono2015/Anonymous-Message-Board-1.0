const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
  let testThreadId;
  let testReplyId;
  const testBoard = 'test';
  const testPassword = 'testpass123';
  const wrongPassword = 'wrongpass';
  
  suite('API ROUTING FOR /api/threads/:board', function() {
    
    suite('POST', function() {
      test('Creating a new thread: POST request to /api/threads/{board}', function(done) {
        chai.request(server)
          .post(`/api/threads/${testBoard}`)
          .send({
            text: 'Test thread text',
            delete_password: testPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            if (res.body && res.body._id) {
              testThreadId = res.body._id;
            }
            done();
          });
      });
    });
    
    suite('GET', function() {
      test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function(done) {
        chai.request(server)
          .get(`/api/threads/${testBoard}`)
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.isAtMost(res.body.length, 10);
            
            if (res.body.length > 0) {
              const thread = res.body[0];
              assert.property(thread, '_id');
              assert.property(thread, 'text');
              assert.property(thread, 'created_on');
              assert.property(thread, 'bumped_on');
              assert.property(thread, 'replies');
              assert.property(thread, 'replycount');
              assert.notProperty(thread, 'delete_password');
              assert.notProperty(thread, 'reported');
              
              if (!testThreadId) {
                testThreadId = thread._id;
              }
              
              assert.isArray(thread.replies);
              assert.isAtMost(thread.replies.length, 3);
              
              if (thread.replies.length > 0) {
                const reply = thread.replies[0];
                assert.property(reply, '_id');
                assert.property(reply, 'text');
                assert.property(reply, 'created_on');
                assert.notProperty(reply, 'delete_password');
                assert.notProperty(reply, 'reported');
              }
            }
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password', function(done) {
        chai.request(server)
          .delete(`/api/threads/${testBoard}`)
          .send({
            thread_id: testThreadId,
            delete_password: wrongPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'incorrect password');
            done();
          });
      });
      
      test('Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password', function(done) {
        // First create a new thread to delete
        chai.request(server)
          .post(`/api/threads/${testBoard}`)
          .send({
            text: 'Thread to delete',
            delete_password: testPassword
          })
          .end(function(err, res) {
            let threadToDeleteId;
            if (res.body && res.body._id) {
              threadToDeleteId = res.body._id;
              // Now delete it
              chai.request(server)
                .delete(`/api/threads/${testBoard}`)
                .send({
                  thread_id: threadToDeleteId,
                  delete_password: testPassword
                })
                .end(function(err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.text, 'success');
                  done();
                });
            } else {
              // Fallback: get threads and find one to delete
              chai.request(server)
                .get(`/api/threads/${testBoard}`)
                .end(function(err, res) {
                  const threadToDelete = res.body.find(t => t.text === 'Thread to delete');
                  if (threadToDelete) {
                    chai.request(server)
                      .delete(`/api/threads/${testBoard}`)
                      .send({
                        thread_id: threadToDelete._id,
                        delete_password: testPassword
                      })
                      .end(function(err, res) {
                        assert.equal(res.status, 200);
                        assert.equal(res.text, 'success');
                        done();
                      });
                  } else {
                    done();
                  }
                });
            }
          });
      });
    });
    
    suite('PUT', function() {
      test('Reporting a thread: PUT request to /api/threads/{board}', function(done) {
        chai.request(server)
          .put(`/api/threads/${testBoard}`)
          .send({
            thread_id: testThreadId
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'reported');
            done();
          });
      });
    });
  });
  
  suite('API ROUTING FOR /api/replies/:board', function() {
    
    suite('POST', function() {
      test('Creating a new reply: POST request to /api/replies/{board}', function(done) {
        chai.request(server)
          .post(`/api/replies/${testBoard}`)
          .send({
            thread_id: testThreadId,
            text: 'Test reply text',
            delete_password: testPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            done();
          });
      });
    });
    
    suite('GET', function() {
      test('Viewing a single thread with all replies: GET request to /api/replies/{board}', function(done) {
        chai.request(server)
          .get(`/api/replies/${testBoard}`)
          .query({ thread_id: testThreadId })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.property(res.body, '_id');
            assert.property(res.body, 'text');
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'bumped_on');
            assert.property(res.body, 'replies');
            assert.notProperty(res.body, 'delete_password');
            assert.notProperty(res.body, 'reported');
            
            assert.isArray(res.body.replies);
            if (res.body.replies.length > 0) {
              const reply = res.body.replies[res.body.replies.length - 1];
              assert.property(reply, '_id');
              assert.property(reply, 'text');
              assert.property(reply, 'created_on');
              assert.notProperty(reply, 'delete_password');
              assert.notProperty(reply, 'reported');
              
              testReplyId = reply._id;
            }
            done();
          });
      });
    });
    
    suite('PUT', function() {
      test('Reporting a reply: PUT request to /api/replies/{board}', function(done) {
        chai.request(server)
          .put(`/api/replies/${testBoard}`)
          .send({
            thread_id: testThreadId,
            reply_id: testReplyId
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'reported');
            done();
          });
      });
    });
    
    suite('DELETE', function() {
      test('Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password', function(done) {
        chai.request(server)
          .delete(`/api/replies/${testBoard}`)
          .send({
            thread_id: testThreadId,
            reply_id: testReplyId,
            delete_password: wrongPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'incorrect password');
            done();
          });
      });
      
      test('Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password', function(done) {
        chai.request(server)
          .delete(`/api/replies/${testBoard}`)
          .send({
            thread_id: testThreadId,
            reply_id: testReplyId,
            delete_password: testPassword
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'success');
            done();
          });
      });
    });
  });
});
