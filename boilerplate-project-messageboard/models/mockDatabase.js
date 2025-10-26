// Mock database for testing when MongoDB is not available
let threads = [];
let nextId = 1;

const mockDatabase = {
  Thread: {
    find: ({ board }) => {
      return {
        sort: () => ({
          limit: () => ({
            select: () => ({
              exec: async () => {
                return threads
                  .filter(t => t.board === board)
                  .sort((a, b) => new Date(b.bumped_on) - new Date(a.bumped_on))
                  .slice(0, 10)
                  .map(t => ({
                    ...t,
                    toObject: () => t
                  }));
              }
            })
          })
        })
      };
    },
    
    findById: (id) => ({
      select: () => ({
        exec: async () => {
          const thread = threads.find(t => t._id === id);
          if (!thread) return null;
          return {
            ...thread,
            toObject: () => thread,
            replies: {
              id: (replyId) => thread.replies.find(r => r._id === replyId)
            },
            save: async function() {
              const index = threads.findIndex(t => t._id === id);
              if (index !== -1) {
                threads[index] = this;
              }
            }
          };
        }
      })
    }),
    
    findByIdAndDelete: async (id) => {
      const index = threads.findIndex(t => t._id === id);
      if (index !== -1) {
        threads.splice(index, 1);
      }
    },
    
    create: (data) => {
      const newThread = {
        ...data,
        _id: String(nextId++),
        created_on: new Date(),
        bumped_on: new Date(),
        reported: false,
        replies: []
      };
      threads.push(newThread);
      return {
        ...newThread,
        save: async () => newThread
      };
    }
  }
};

module.exports = mockDatabase;