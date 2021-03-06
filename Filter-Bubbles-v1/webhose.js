console.log('WebHose is all good')

// array (list) of news sites
var sites = 
[
  'dailymail.co.uk',
  'bbc.co.uk',
  'mirror.co.uk',
  'theguardian.com',
  'independent.co.uk',
  'express.co.uk'
]

//var recent = 'Osborne'

function getWebhoseData(webhoseURL, containerID)
{
  console.log('getWebhoseData', webhoseURL)

  var ul = $(containerID)
  
  $.ajax(
  {
    dataType: "json",
    url: webhoseURL, // the url to get data from
    success: function ( json ) // the function to execute once we get data back from WebHose
    {
      console.log(json)

      //the counter that goes through the JSON data
      
      var posts = json.posts

      var total = posts.length
      var counter = 0
      while (counter < total) 
      {
        // using the counter to go through the 'post' variable (Each Article)
        
        var post = posts[counter]

        console.log(post) 
        // console.log(post.title)
        // console.log(post.url)
        // console.log(post.thread.main_image)
        
        //The List structure for the pulled content
        
        var li = '<li>'
              // + '<h2>' + post.title + '</h2>'
              + '<a href="' + post.url + '">' + '<img src="' + post.thread.main_image + '">'
              + '<div class="a-wrapper"><a href="' + post.url + '">' + post.title + '</a></div>'
              + '</li>'
        
        //shows the list with content
        
        ul.append(li)

        //increment counter by 1
        //counter = counter + 1
        //counter += 1
        counter ++
      }
    } 
  }) 
}

// Webhose API 
// see https://webhose.io/documentation 
// example https://webhose.io/search?token=b4e7b558-57ce-4c49-a8d2-ac3636d65afb&format=json&q=corbyn thread.title:(corbyn) language:(english) site:theguardian.com performance_score:>0 (site_type:news OR site_type:blogs)&ts=1468500828727
function getWebhoseURL(query, site)
{
  var token = '32083bb7-13bf-40c4-a810-5e5c518f259d'
  var performance_score = 0 // 0 - 10 (10 being super-viral)
  var language = 'english'
  var site_type = 'news'
  
  var webhoseURL = 'https://webhose.io/search'
                 + '?token=' + token
                 + '&format=json'
                 + '&q=' + query
                 // + ' thread.title:(' + query + ')' // uncomment if you want to restrict results to those who have query in the article's title
                 + ' language:(' + language +')'
                 + ' site:' + site 
                 + ' performance_score:>' + performance_score 
                 + ' (site_type:' + site_type + ')'

  console.log('getWebhoseURL', webhoseURL)

  // https://webhose.io/search?token=b4e7b558-57ce-4c49-a8d2-ac3636d65afb&format=json&q=corbyn thread.title:(corbyn) language:(english) site:theguardian.com performance_score:>0 (site_type:news)

  return webhoseURL   
}

