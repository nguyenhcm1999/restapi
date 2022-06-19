// 1. Front-end: Xây dựng giao diện người dùng
// 2. Back-end: Xây dựng logic xử lý + cơ sở dữ liệu
// API (URL) lấy nội dung được lưu trữ trong phía BE -> application programing interface
// API là cổng giao tiếp giữa các phần mềm
// fetch cũng chính là promise
// fetch trả lại 1 cái stream, luồng dữ liệu được trả về



// Backend -> API (backend cung cấp url) -> Fetch -> JSON/XML -> JSON.parse -> Javascript types

// -> Render ra giao diện với HTML

//  package.json quản lý thư viện mình cài
//  -Json server: API Server (Fake) / Mock API
//  -CRUD
//      - Create: Tạo mới -> POST
//      - Read: Lấy dữ liệu, khi hiển thị ra gì đó thì gọi lên API server với hành vi read -> GET
//      - Update: Chỉnh sửa -> PUT/PATCH
//      - Delete: Xóa -> DELETE
//  -Postman là công cụ giúp làm việc với API nhanh chóng
//  



// var courseApi = 'http://localhost:3000/courses'

//     fetch(courseApi)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(courses){
//         console.log(courses);
//     });




 
var listCoursesBlock = 
    document.querySelector('#list-courses')

var courseApi = 'http://localhost:3000/courses'

// function start() {
//     getCourses(function(courses){
        
//         renderCourses(courses);
//     })
// }

function start() {
    getCourses(renderCourses);
    
    //handleCreateForm vẫn chạy khi start()
    handleCreateForm();
    
}

start();

// Functions
// nó có method Get để hiển thị, nên không cần thêm
function getCourses(callback) { 
    fetch(courseApi)
    .then(function(response){
       return response.json()
    })
    .then(callback)
    // .then(console.log(callback))
}

function creatCourse(data,callback){
    var options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
    .then(function(response){
        response.json();
    })
    .then(callback)
}

function updateCourse(id,data,callback){
    var options = {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi +'/'+ id, options)
    .then(function(response){
        response.json();
    })
    .then(callback)
    // .then(function(){getCourses(renderCourses)})
    
}
function resetCourse(){
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="description"]').value = '';
}


function handleUpdateCourse(id){
    document.querySelector('input[name="name"]').value = 
    document.querySelector('.course-name-' + id).textContent
	document.querySelector('input[name="description"]').value = 
    document.querySelector('.course-description-' + id).textContent

    
    document.querySelector('#create').style.display = 'none';
	document.querySelector('#update').style.display = 'inline-block';
    
    var updateBtn = document.querySelector('#update');
    updateBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };

        updateCourse(id, formData, function() {
            getCourses(renderCourses);
            resetCourse()
            });

        document.querySelector('input[name="name"]').value = '';
        document.querySelector('input[name="description"]').value = '';
        document.querySelector('#create').style.display = 'inline-block';
        document.querySelector('#update').style.display = 'none';
    }      
}

function handleDeleteCourse(id){
    var options = {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        
    }
    fetch(courseApi +'/'+ id, options)
    .then(function(response){
        response.json();
        
    })
    .then(function(){
        // Cách này không phải call lại API, gỡ khỏi DOM
        var courseItem = document.querySelector('.course-item-'+ id)
        if(courseItem){
            courseItem.remove();
        }

        // cách này phải call lại API
        // getCourses(renderCourses)
    })
}

function renderCourses(courses) {
    var listCoursesBlock = 
    document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4 class="course-name-${course.id}">${course.name}</h4>
                <p class="course-description-${course.id}">${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function creatCourse(data,callback){
    var options = {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
    .then(function(response){
        response.json();
    })
    .then(callback)
}

function handleCreateForm(){
    var createBtn =document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value
        
        var formData = {
            name: name,
            description: description
        }
        creatCourse(formData,function(){
            getCourses(renderCourses)
            resetCourse()
        })
    }
}

