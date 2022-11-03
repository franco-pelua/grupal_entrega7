# grupal_entrega7

En esta entrega grupal trabajaremos en una aplicación CRUD, capaz de conectarse con un servidor y realizar modificaciones en una base de datos.

Para ello, haremos uso de un mock server, o servidor simulado, que nos permitirá crear rápidamente los recursos backend necesarios y concentrarnos en el trabajo en cliente. 

Antes de empezar, debemos configurar el servidor. 
Les dejamos una guía para crearlo con el servicio de MockApi, que es muy sencillo de utilizar, pero pueden crearlo con cualquier otro servicio (postman, stoplight, mocky, etc.):

1. Entran a https://mockapi.io/ y se registran (debe hacerlo solamente un integrante del subgrupo).
2. Una vez registrados crean un nuevo proyecto de nombre crud, dejando los otros campos en blanco. 
![image](https://user-images.githubusercontent.com/72584397/199712426-5eb6d320-e3e9-4589-9785-9dd31172dc5c.png)
3. Ya tenemos disponible la url con la que trabajaremos, y que tendrá el formato https://SECRET.mockapi.io/
![image](https://user-images.githubusercontent.com/72584397/199712490-0f53ab34-c7ac-434c-9a8b-6c940740319a.png)
4. Crearemos un nuevo recurso de nombre users para la entidad usuario, con la que trabajará nuestro sitio. Para ello borraremos los atributos por defecto (excepto ID) y crearemos dos, name y lastname, ambos del tipo string.
![image](https://user-images.githubusercontent.com/72584397/199712523-d0ebfbd7-f103-4ffa-9f20-c9567b3bd6fa.png)
5. Por último, generaremos 5 registros iniciales para trabajar con ellos. Para esto alcanzará con arrastrar sobre la barra con el nombre del recurso (users).
![image](https://user-images.githubusercontent.com/72584397/199712556-fc6ddcee-4b31-420d-a715-1507084fe701.png)
6. Los endpoints a los que realizar las solicitudes serán:
* Listar: GET https://SECRET.mockapi.io/users
Devuelve un json con una lista que contiene todos los registros.
* Obtener 1: GET https://SECRET.mockapi.io/users/:id
Recibe un id en la url y devuelve un json con el registro cuyo id haya sido solicitado.
* Agregar: POST https://SECRET.mockapi.io/users
Recibe un json con un objeto con los atributos name y lastname, (en el body) lo agrega a la base de datos (asignándole un id) y devuelve un json con el registro creado.
* Modificar: PUT https://SECRET.mockapi.io/users/:id
Recibe un id en la url y un json con un objeto con los atributos name y lastname, (en el body), modifica con dichos datos el registro cuyo id coincida con el recibido, y devuelve un json con el registro modificado.
* Eliminar: DELETE https://SECRET.mockapi.io/users/:id
Recibe un id en la url, elimina el registro cuyo id coincida con el recibido, y devuelve un json con el registro eliminado.

Ahora que tenemos listo nuestro servidor, vamos a trabajar a nivel de cliente. Para ello disponemos de una página web (adjunta) a la que debemos realizar las modificaciones necesarias para comunicarse con nuestro servidor a través de fetch().

1. El botón "Buscar" debe mostrar como resultado el registro cuyo id haya sido solicitado.
En caso de dejar vacío el campo del id, debe mostrar cómo resultado la lista de todos los registros.
![image](https://user-images.githubusercontent.com/72584397/199712951-cd0a9d30-0d06-48d5-930e-eaf74d1d0200.png)
![image](https://user-images.githubusercontent.com/72584397/199712969-4a1916b7-9de2-4090-b6ca-e8f6225f030b.png)
2. El botón "Agregar" debe enviar al servidor un objeto construido con los valores introducidos por el usuario en los campos nombre y apellido. 
Deberá mostrar como resultado el listado de registros, incluyendo el agregado.
![image](https://user-images.githubusercontent.com/72584397/199713009-2c925d7f-0633-436e-b76c-18a6f1cf69f5.png)
3. El botón "Modificar" deberá abrir un modal donde se muestren los campos nombre y apellido, ya con los valores cargados coincidentes con el registro cuyo id ingresó el usuario. 
El usuario debe poder modificar dichos valores, y al presionar el botón para guardar los cambios, se debe realizar la consulta adecuada para modificar el registro, cerrar el modal, y mostrar como resultado la lista de registros, con las correspondientes modificaciones.
![image](https://user-images.githubusercontent.com/72584397/199713050-52c2c55a-cbd9-4e19-b772-13abf98864d9.png)
![image](https://user-images.githubusercontent.com/72584397/199713059-47b9b5ef-69c9-411c-acb5-5ecab08239f4.png)
![image](https://user-images.githubusercontent.com/72584397/199713068-19fca75d-8056-425d-abb0-789aeea3d2bc.png)
![image](https://user-images.githubusercontent.com/72584397/199713087-ccdab5cd-fbfc-4724-ada9-d980707ba4da.png)
4. El botón "Borrar" deberá realizar la consulta para eliminar el registro cuyo id coincida con el ingresado por el usuario, y mostrar como resultado el listado de registros, ya con el mismo eliminado.
![image](https://user-images.githubusercontent.com/72584397/199713128-d996cbb7-5261-483c-b192-28bb3f80318a.png)
5. Por último, en todos los casos, excepto el de "Buscar", los botones que realizan la consulta deberán permanecer desactivados, mientras alguno de los campos correspondientes se encuentre vacío.
Además, en caso de que la solicitud genere una respuesta con un status no ok, por ejemplo si intentamos borrar, modificar o buscar un registro inexistente, se deberá avisar al usuario por medio de una alerta que algo no salió bien.
![image](https://user-images.githubusercontent.com/72584397/199713166-f32af0a7-7b7f-42a4-a912-e70779b2b170.png)




