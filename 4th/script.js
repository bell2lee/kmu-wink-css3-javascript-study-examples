const firebaseConfig = {
    apiKey: "AIzaSyBZobaUI022VLoX2A6veXQicyJAiH4yEfU",
    authDomain: "test-483dd.firebaseapp.com",
    databaseURL: "https://test-483dd.firebaseio.com",
    projectId: "test-483dd",
    storageBucket: "test-483dd.appspot.com",
    messagingSenderId: "577707820305",
    appId: "1:577707820305:web:9d3e328ff0210a6a2d38b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


let postTable = document.querySelector("#post_content");

function writePost(name, content){
    database.ref().child('posts').push({
        name:"test",
        content: "방명록 남겨요 총총 ^^",
        createdAt: new Date().toString(),
    });
}

async function getPosts(){
    return await database.ref('/posts/').once('value');
}

async function dataFetchOne(){
    const posts = Object.entries((await getPosts()).val());
    console.log(posts);

    for (let i = 0; i < posts.length; i++)
    {
        const [key, value] = posts[i];
        console.log(key, value)
        postTable.innerHTML += "<tr>" +
            "<td>" + value['name'] + "</td> <td>" + value['content'] + "</td> <td>"  + value['createdAt'] + "</td>" +
            "</tr>";

    }
}

function onDataFetch(){
    let postRef = database.ref('/posts/');
    postRef.on('value', function(snapshot) {
        console.log("서버에서 데이터가 바뀌었음");
        const posts = Object.entries(snapshot.val());
        console.log(posts);
        postTable.innerHTML="";
        for (let i = 0; i < posts.length; i++)
        {
            const [key, value] = posts[i];
            console.log(key, value)
            postTable.innerHTML += "<tr>" +
                "<td>" + value['name'] + "</td> <td>" + value['content'] + "</td> <td>"  + value['createdAt'] + "</td>" +
                "</tr>";
        }
    });
}

window.addEventListener('load', onDataFetch);