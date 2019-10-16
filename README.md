Create a map and add, edit, delete markers using CRUD operations in React

## Available Scripts

In the project directory, you can run:

### `npm start`

Run the application server and development server using this command. This command will run both the servers

### `npm test`

Run the unit and integration testcases using this command.



## `Items`

* I have created a react project using `create-react-app` and added created required components to display google maps and view, add, delete, edit markers.
* Created node `Express server` to handle backend CRUD apis and used `MongoDB` with `Mongoose` schema to save the data.
* I have impleneted adding marker functionality using the `Geocoding` api which converts addresses into coordinates and used `Axios` third party HTTP library to request data from geocoding api.
* Included required `Unit` and `Integratio`n` testcases using `Jest` with `Enzyme`.
* I have used `Bootstrap` classses to enhance the design of the app.
* An invalid or non-existent input address has been handled.

## `Guideline Questions`

* How do you handle configuration values? What if those values change?
    Configuration values like google api key and mongodb connection strings have been seperated into .env file. It makes things easier to manage configuration values.

* What happens if we encounter an error with the third-party API integration? - Will it also break our application, or are they handled accordingly?
    No, it won’t break the application and I have handled it. Added Error Boundary Component for google map component and handled error producing scenarios for geocoding API.

* Now we will need to change the third-party geocoder API to another one. How can we change our current   solution so that we can make this change as seamless as possible? Or how will we change (or refactor)   our solution so that any future changes with the third-party integration is only done in isolation?
     It can be done by creating a separate component.


`Below I have attached screenshots of the flows and testing execution`


<br>

<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img1.png" />

<br>

<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img2.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img3.png" />

<br>



<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img4.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img5.png" />

<br>

<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img6.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img7.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img8.png" />

<br>

<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img9.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img10.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img11.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img12.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img13.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img14.png" />

<br>


<img height="500" src="https://github.com/Sarath2013/ReactMaps_CRUD/blob/master/images/img15.png" />

<br>







