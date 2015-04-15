var env = process.env;
var api_key = env.MY_API_KEY;
console.log(env.My_API.PATH);

//export MY_API_KEY=

//FB API KEY=thisistheapikeythingsgoeshere

var myFn = function(someUrl) {
	request(someUrl+"?key="+api_key);
};

//Directions

//in bash run
export FB_API_KEY=thisistheapikeythingsgoeshere
export FB_API_ID=eghsgshgsjgksdhgksghs;keghsihgslgslkghls

//tell git to ignore .env file
echo ".env" >> .gitignore