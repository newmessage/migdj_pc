
function FlashPlayer()
{
    
    this.FlashInstance = null;
    var sound_files = null;
    this.Init = function(files)
    {

		var gameDiv = document.getElementById('gameDiv');

        var flash_object = document.createElement('div');
		flash_object.id = "FlashPlayer";
        
		gameDiv.appendChild(flash_object);
		flash_object.innerHTML='\
                            <object type="application/x-shockwave-flash" id="ObjectFlashPlayer" width="0" height="0" data="js/3rd/audio/FlashPlayer.swf">\
                                <param name="allowScriptAccess" value="sameDomain" />\
                                <param name="movie" value="js/3rd/audio/FlashPlayer.swf" />\
                                <param name="quality" value="high" />\
                                <param name="scale"value="noscale" />\
                                <param name="wmode" value="transparent"/>\
                            </object>';
        
        this.FlashInstance = document.getElementById("ObjectFlashPlayer");
        
        sound_files = files;
    };
    
    this.InitOK = function()
    {
          for(var i=0; i < sound_files.length; i++)
          {
              FlashPlayer.FlashInstance.Flash_CreateSound(i, SERVER_URL + sound_files[i].file);
          }
    };
    
    this.Play = function(index)
    {
        FlashPlayer.FlashInstance.Flash_Play(index);
    };
    
    this.Stop = function(index)
    {
        FlashPlayer.FlashInstance.Flash_Stop(index);
    };
    
    this.SetVolume = function(index, value)
    {
        FlashPlayer.FlashInstance.Flash_SetVolume(index, value);
    };
    
    this.IsLoaded = function()
    {
        return true;
    };
}

var FlashPlayer = new FlashPlayer();

