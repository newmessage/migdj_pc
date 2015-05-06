/**
 * hung.phamviet
 */

var DJ_BUTTON_POS_Y	=	1050;
var DJ_BUTTON_POS_X	=	[70,220,370];
var GOOD_MOVE_POS_Y	=	300;

var DJ_DISK_POS	=	{
		x: 700,
		y: 1200
};

function TopPane()
{
	var file = null;
	var reader = null;
	var m_spr = null;
	var m_anim = null;
	
	this.LoadData = function() 
	{
	};
	
	this.Init = function() 
	{
		file = load_binary_resource('/bin/Sparkle.bin');
        //alert(file);
		// Create the Binary Reader
		reader = new BinaryReader(file);

		m_spr = new SpriteAurora();	
		m_spr.SetImage('./data/Sprites/Sparkle.png');
		m_spr.Load(reader);
			
		m_anim = new Animation(m_spr);
		m_anim.SetAnim(0, 200, 400, -1);
	};
	
	this.Update = function(time)
	{
		m_anim.Update();
	};
	
	this.Draw = function() 
	{
		m_anim.Render(Graphic.GetContext());
	};
	
}

//inherit from "Object"
TopPane.prototype = new Object();
TopPane.prototype.constructor = TopPane;

var TopPane = new TopPane();