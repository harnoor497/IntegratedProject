firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerText = taskText;

    // Create a "Share" button
    const shareButton = document.createElement('button');
    shareButton.innerText = 'Share';
    shareButton.addEventListener('click', function () {
      shareTask(taskText);
    });

    taskItem.appendChild(shareButton);
    taskList.appendChild(taskItem);
    taskInput.value = '';

    // Store task in Firestore
    db.collection('checklists')
      .add({
        title: taskText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		checklistId: 'adsasdqwnedqjwwne123123'
      })
      .then(function (docRef) {
        console.log('Task added with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding task: ', error);
      });
  }
}

// Share the task text
function shareTask(taskText) {

  alert('Task shared: ' + taskText);
}
