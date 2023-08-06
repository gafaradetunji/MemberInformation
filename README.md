# Member Information Page

This Page is a simple Page that get its data from [Json Placeholder Dummy data](https://jsonplaceholder.typicode.com/users) and although not all related to the page was fetched because they are not present in the given API.
The data in the table include:

- Name
- Username
- User Image
- Status
- Email
- Role
- Rating

But the Datas fetched are:

- Name
- Username
- Email
- Role `The role was modified address.city is what was originally fetched from the database`

The status will always return `INACTIVE` until the data resolves to true. According to our call there's no status.
The Page Displays only 5 Member Informations and you can also view the subsequent ones by clicking on the next Button and to go back You click the previos Button.
The Informations are arranged in a table and the admin also have the ability to delete a User and also Modify a User's Information.

### Search Function

The Search functionality also works asynchronously
It waits for the user to type and if the user stops typing it sends the API call. The reason I implemented it this way is to make sure the API is not being called too often.

### Delete Button

If the button is clicked, It asks for confirmation if the user want to be deleted.

### Edit Button

If the button is clicked, It brings out a form with the user's information and you have the ability to change anything there and it will be updated.
