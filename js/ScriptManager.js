/**
 * hung.phamviet
 */

//script file use in project
var InGameScriptFile=[
	
	
	"js/game/Button.js",
	"js/game/DJButton.js",
	"js/game/MusicNote.js",
	"js/game/DJ_Table.js",
	"js/game/MusicNoteManager.js",
	
	"js/game/sprite.js",
	"js/game/TopPane.js",
	"js/game/StateEndGame.js",
];
var MainScriptFile=[
    "js/game/define.js",
    "js/game/Utility.js",
    "js/game/ScreenDefine.js",
    "js/game/Object.js",
    "js/game/Input.js",
	"js/game/Graphic.js",
    "js/3rd/buffer-loader.js",
    "js/game/SoundManager.js",
    "js/game/AudioManager.js",
    
    //"js/game/TopBar.js",
    "js/game/StatePreLoad.js",
    "js/game/StateLoading.js",
    
    
    "js/GameCore.js",
	"js/main.js"
];

var scriptLoaded = false;
function ScriptManager()
{
	//function
	this.loadScript = loadScript;
	this.Load = Load;
	
	var index;
    var scriptList = null;

	/*
	 * implement
	 */
	
	function Load(list)
	{
        scriptLoaded = false;
        
        //load script in file list
        scriptList = list;
		index = 0;
		loadScriptIndex(index);
	}
    
    this.IsLoaded = function()
    {
        return scriptLoaded;
    }
	
	function loadScriptIndex()
	{
		if(index < scriptList.length)
		{
            loadScript(SERVER_URL + scriptList[index], LoadScriptCallBack);
			index ++;
		}
		else
        {
            scriptLoaded = true;
            Utility.log("Finish load js file...");
        }
	}
	
	function loadScript(url, callback)
	{
        
       //console.log("Load file: "+url);
		
	    // Adding the script tag to the head as suggested before
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
        script.charset = 'UTF-8';
	
	    // Then bind the event to the callback function.
	    // There are several events for cross browser compatibility.
	    script.onreadystatechange = callback;
	    script.onload = callback;
	
	    // Fire the loading
	    head.appendChild(script);
	}
	
	function LoadScriptCallBack()
	{
		loadScriptIndex();
	}
}

var ScriptManager = new ScriptManager(); 
ScriptManager.Load(MainScriptFile);