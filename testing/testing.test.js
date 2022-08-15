const {obj,obj2,CharCounter,Episode_Location} = require('../index')



   
test('La funcion CharCounter se ejecuta en menos o igual a tres segundos', async () => {
    await CharCounter();
    expect(obj.in_time).toBe(true);
  });

test('La funcion Episode_Location se ejecuta en menos o igual a tres segundos', async () => {
    await Episode_Location();
    expect(obj2.in_time).toBe(true);
  });

  

 