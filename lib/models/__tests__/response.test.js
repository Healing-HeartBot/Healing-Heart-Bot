const Response = require('../response');

describe('Response Model', () => {

  it('Valid response model', () => {
    
    const data = {
      content: 'https://gph.is/2v8HV7l',
      type: 'gif',
      moods: ['sad', 'bitter']
    };

    const response = new Response(data);
    expect(response.content).toBe(data.content);
    expect(response.type).toBe(data.type);
  });

  

});