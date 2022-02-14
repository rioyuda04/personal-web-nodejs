// get package express
const express = require('express')

// set use package express
const app = express()

// set template engine ( view engine setup)
app.set('view engine','hbs')

// app.use('/public', express.static( __dirname + '/public'))
app.use(express.static('public'))
// set url encoded for get on page 
app.use(express.urlencoded({extended: false}))

// set variable array 
const dataBlog = [ ]
const dataDuration = [ ]
const dataDetail = [ ]
const dataEdit = [ ]

// set variable month
let month = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

// set partials directory  for import navbar.hbs
const hbs = require('hbs')
hbs.registerPartials(__dirname + '/views')

// ########## END POINT ###############################
// set redirect deafult to home page
app.get('/', function(req, res){
    res.redirect('home')
})
// get data to home page 
app.get('/home', function(req, res){
    let getBlog = dataBlog.map(function (data){
        return {
            ...data
        }
    })
    res.render('index', { dataBlog: getBlog})
})
// set page view contact
app.get('/contact', function(req, res){
    res.render('contact')
})

//========= UPDATE PROJECT ============================
// get update project by index
app.get('/updateproject/:index', function(req, res){
    let index = req.params.index
    dataEdit.push(dataBlog[index]) 

    res.redirect('/edit')
})
// get view update project
app.get('/edit', function(req, res){
    if (dataEdit[1] ){
        dataEdit.splice(0, 1)
        res.render('project-update', {dataBlog : dataEdit})
    }else{
    res.render('project-update', {dataBlog : dataEdit})
    }
})

// set action for update or edit project
app.post('/edit/:index', function(req, res){
    let index = req.params.index
    dataBlog.splice(index, 1)

    let {
            projectname, startdate, enddate, description, image,
            android, apple, windows, linux
        } = req.body

    durationDate(startdate, enddate)

    let updateProject = {
        projectname,
        description,
        startdate : dataDuration[0].fStartdate,
        enddate : dataDuration[0].fEnddate,
        dataDay : dataDuration[0].dataDay,
        dataMonth : dataDuration[0].dataMonth,
        dataYear : dataDuration[0].dataYear,
        image,
        android,
        apple,
        windows,
        linux
    }
    
    dataBlog.push(updateProject)
  
    res.redirect('/home')
    // console.log(dataBlog)
})
//========= END UPDATE PROJECT ============================


//========= DETAIL PROJECT ============================
// get my project by index
app.get('/myproject-detail/:index', function(req, res){
    let index = req.params.index
    dataDetail.push(dataBlog[index]) 

    res.redirect('/detail')
})
// get view my project
app.get('/detail', function(req, res){
    if (dataDetail[1] ){
         dataDetail.splice(0, 1)
         res.render('myproject-detail', {dataBlog : dataDetail})
    }else{
    res.render('myproject-detail', {dataBlog : dataDetail})
    // console.table(datatest)
     }
})
//========= END DETAIL PROJECT ============================

// set page view my project
app.get('/addproject', function(req, res){
    res.render('myproject')
})
// Post data project view to home page
app.post('/home', function (req, res){

    let {
            projectname, startdate, enddate, description, image,
            android, apple, windows, linux
        } = req.body

    durationDate(startdate, enddate)

    let dataproject = {
        projectname,
        description,
        startdate : dataDuration[0].fStartdate,
        enddate : dataDuration[0].fEnddate,
        dataDay : dataDuration[0].dataDay,
        dataMonth : dataDuration[0].dataMonth,
        dataYear : dataDuration[0].dataYear,
        image,
        android,
        apple,
        windows,
        linux
    }

    dataBlog.push(dataproject)

    res.redirect('/home')

})
// end post my project

app.get('/deleteproject/:index', function(req, res){
    let index = req.params.index

    dataBlog.splice(index, 1)
    dataDuration.splice(index, 1)
    res.redirect('/home')
})

// ########## END POINT ###############################

function durationDate(startdate, enddate){

    // init data startdate
    let createStartDate = new Date(startdate)
    let getStartYear = createStartDate.getFullYear()
    let getStartMonth = createStartDate.getUTCMonth() + 1
    let getStartDay = createStartDate.getUTCDate()

    // set format start date
    let fStartMonth = month[getStartMonth - 1]
    let fStartdate = `${getStartDay} ${fStartMonth} ${getStartYear}`

    // init data enddate
    let createEndDate = new Date(enddate)
    let getEndYear = createEndDate.getFullYear()
    let getEndMonth = createEndDate.getUTCMonth() + 1
    let getEndDay = createEndDate.getUTCDate() 

    // set format End date
    let fEndMonth = month[getEndMonth - 1]
    let fEnddate = `${getEndDay} ${fEndMonth} ${getEndYear}`

    // init distance
    let DistanceYear = getEndYear - getStartYear
    let DistanceMonth = getEndMonth - getStartMonth
    let DistanceDay = getEndDay - getStartDay
    
    // get data duration
    let dataYear = ` `
    let dataMonth = ` `
    let dataDay = ` `
    if ( DistanceYear >= 1 ){
        dataYear = `${DistanceYear} Year `
    }else { dataDuration.splice(dataYear)}
    if ( DistanceMonth >= 1 ){
        dataMonth = `${DistanceMonth} Month `
    }else { dataDuration.splice(dataMonth) }
    if ( DistanceDay >= 1 ){
        dataDay = `${DistanceDay} Day `
    }else{ dataDuration.splice(dataDay) }
    
    let getDuration = {
        dataYear,
        dataMonth,
        dataDay,
        fStartdate,
        fEnddate
    }
    dataDuration.push(getDuration)
    // console.log(dataDuration)
}
  

// ====== SET DEFAULT PORT on LOCALHOST =========
const port = 5000
app.listen(port, function(){
    console.log('Server running')
})
// ====== END =================================== 