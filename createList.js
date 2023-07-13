    const firebaseConfig = {
      apiKey: 'AIzaSyDhsH_gMswEQpLI6Kfn2AJaDILOC5CWjjw',
      authDomain: 'authentication-app-cc0a3.firebaseapp.com',
      databaseURL:
        'https://authentication-app-cc0a3-default-rtdb.firebaseio.com',
      projectId: 'authentication-app-cc0a3',
      storageBucket: 'authentication-app-cc0a3.appspot.com',
      messagingSenderId: '353753930218',
      appId: '1:353753930218:web:077677333092728a533a93',
    };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const createButton = document.getElementById('create-button');
const checklistInput = document.getElementById('checklist-input');
const checklistContainer = document.getElementById('checklist-container');

createButton.addEventListener('click', () => {
  const checklistText = checklistInput.value;

  db.collection('checklists')
    .add({
      text: checklistText,
      completed: false,
      checklistId,
	  title: checklistText,
    })
    .then((docRef) => {
      console.log('Checklist added with ID: ', docRef.id);
      // Generate share link for the created checklist
      generateShareLink(docRef.id);
    })
    .catch((error) => {
      console.error('Error adding checklist: ', error);
    });

  // Clear the input field
  checklistInput.value = '';
});

db.collection('checklists')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const checklist = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = checklist.text;
      checklistContainer.appendChild(listItem);
      // Generate share link for each existing checklist
      generateShareLink(doc.id, listItem);
    });
  })
  .catch((error) => {
    console.error('Error retrieving checklists: ', error);
  });

function generateShareLink(checklistId, listItem) {
  const shareLink = document.createElement('a');
  shareLink.href = window.location.href + '?checklist=' + checklistId;
  shareLink.textContent = 'Share';
  shareLink.classList.add('share-link');

  if (listItem) {
    checklistContainer.insertBefore(listItem, checklistContainer.firstChild); // Insert the checklist item at the beginning of the checklist container
    checklistContainer.insertBefore(shareLink, checklistContainer.firstChild); // Insert the share link right above the checklist item
  } else {
    checklistContainer.insertBefore(shareLink, checklistContainer.firstChild); // Prepend the share link to the container
  }
}

// Retrieve the checklist ID from the URL query parameter
function getChecklistIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('checklist');
}

// If a checklist ID is present in the URL, retrieve and display the checklist
const checklistId = getChecklistIdFromURL();
if (checklistId) {
  db.collection('checklists')
    .doc(checklistId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const checklist = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = checklist.text;
        checklistContainer.appendChild(listItem);
      } else {
        console.error('Checklist not found.');
      }
    })
    .catch((error) => {
      console.error('Error retrieving checklist: ', error);
    });
}

