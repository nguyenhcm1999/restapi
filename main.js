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
    handleCreatForm();
}

start();

// Functions
// Get để hiển thị
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

function updateCourse(){
    var options = {
        method:'UPDATE',
        headers:{
            'Content-Type':'application/json'
        },
        
    }
    fetch(courseApi +'/'+ id, options)
    .then(function(response){
        response.json();
    })
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
                <h4>${course.name}</h4>
                <h4>${course.description}</h4>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="updateCourse(${course.id})">Sửa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}


function handleCreatForm(){
    var creatBtn =document.querySelector('#creat');
    creatBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value
        
        var formData = {
            name: name,
            description: description
        }
        creatCourse(formData,function(){
            getCourses(renderCourses)
        })
    }
}