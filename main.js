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

function start() {
    getCourses(function(courses){
        renderCourses(courses);
    })
}

function start() {
    getCourses(renderCourses)
}

start();

// Functions
function getCourses(callback) {
    fetch(courseApi)
    .then(function(response){
       return response.json()
    })
    .then(callback)
}

function renderCourses(courses) {
    var listCoursesBlock = 
    document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return `
            <li>
                <h4>${course.name}</h4>
                <h4>${course.description}</h4>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}