/*
hung.phamviet
*/
package  {
	
	import flash.display.MovieClip;
	import flash.external.ExternalInterface;
	import flash.media.Sound;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.media.SoundTransform;
	import flash.media.SoundChannel;
	
	
	public class FlashPlayer extends MovieClip {
		
		
		var player:Array = new Array(5);
		var snd_chanel:Array = new Array(5);
		var snd_transform:Array = new Array(5);
		
		public function FlashPlayer() {
			// constructor code
			
			if (ExternalInterface.available)
			{
				ExternalInterface.addCallback("Flash_CreateSound", CreateSound);
				ExternalInterface.addCallback("Flash_Play", Play);
				ExternalInterface.addCallback("Flash_Stop", Stop);
				ExternalInterface.addCallback("Flash_SetVolume", SetVolume);
				ExternalInterface.addCallback("alert", alert);
			
				ExternalInterface.call("FlashPlayer.InitOK");
			}
		}
		
		function alert(str: String):void
		{
			ExternalInterface.call("alert", str);
		}
		
		function CreateSound(index: int, url: String):void
		{
			player[index] = new Sound(new URLRequest(url));
			snd_transform[index] = new SoundTransform();
			player[index].addEventListener(Event.COMPLETE, completeHandler);
			snd_chanel[index] = new SoundChannel();
			
			//Play(index);
		}
		
		function Play(index:int):void
		{
			snd_chanel[index] = player[index].play();
			snd_chanel[index].soundTransform = snd_transform[index];
		}
		
		function Stop(index:int):void
		{
			player[index].stop();
		}
		
		function SetVolume(index:int, val:Number)
		{
			snd_transform[index].volume = val;
		}
		
		public function completeHandler():void
		{
			//alert("completeHandler");
		}
		
		//callback
		public function CreateSoundCallBack(index:int):void
		{
			ExternalInterface.call("CreateSoundCallBack", index);
		}
	}
	
}
