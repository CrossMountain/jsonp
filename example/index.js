/**
 * Module exports.
 */

// module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * [jsonp description]
 * @param  {String}   url  url to fetch
 * @param  {Function} callback   callback,should have two parameters : callback(err,data)
 *                         
 * @param  {Object}   opts optional,it can have 4 propertys as belove
 *                          param (String) name of the query string parameter to specify the callback (defaults to callback)
 *                          timeout (Number) how long after a timeout error is emitted. 0 to disable (defaults to 10000)
 *                          prefix (String) prefix for the global callback functions that handle jsonp responses (defaults to __jp)
 *                          name (String) name of the global callback functions that handle jsonp responses (defaults to prefix + incremented *                          counter)
 * @return {Null}   
 */
function jsonp(url, callback, opts){
  if (!opts) opts = {};
  var prefix = opts.prefix || '_jp';
  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || (prefix + (count++));
  var param = opts.param || 'callback';
  var timeout = (null != opts.timeout) ? opts.timeout : 10000;

  //set a timer,if a timeout happen,it will cleanup everything then throw a Error Object to the callback Function
  var timer;
  if (timeout) {
    timer = setTimeout(function(){
      cleanup(script,id,timer)
      callback(new Error('Timeout'));
    }, timeout);
  }

  //set a global function to deal with the data fetched
  window[id] = function(data){
    cleanup(script,id,timer)
    if (callback) callback(null, data);
  };

  url=urlHandle(url,param,id)
  var script=createScript(url)

  return null
}

function createScript(url){
  var script = document.createElement('script');
  script.src = url;
  // <script> element will be append to the body element
  var target = document.getElementsByTagName('body')[0] ;
  target.appendChild(script);
  return script
}

/**
 * [urlHandle description]
 * @param  {String} url   [description]
 * @param  {String} param [description]
 * @param  {String} id    [description]
 * @return {String}       ${url}(?|&)${param}=${id}
 */
function urlHandle(url,param,id){
  var enc = encodeURIComponent;
  if(url.indexOf('?')===-1){
    url+=url+'?'+param+'='+enc(id)
  }else{
    url+=url+'&'+param+'='+enc(id)
  }
  url = url.replace('?&', '?');
  return url
}

function cleanup(script,id,timer){
    script.parentNode.removeChild(script);
    window[id] = null;
    if (timer) clearTimeout(timer);
 }


var targetUrl='https://api.douban.com/v2/book/search?q=love'
jsonp(targetUrl,function(err,data){
  if(err){
    console.log(err)
  }else{
    console.log(data)
  }
})
