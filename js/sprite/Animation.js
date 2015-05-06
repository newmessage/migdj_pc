/*
* Copyright (c) 2012 La Minh Truong
*/

Animation = function (data) {
	this.m_sprite 		= data;
	this.m_crtAFrame 	= 0;
	this.m_crtTime 		= 0;
	this.m_nLoop 		= 0;
	this.m_crtAnim 		= -1;		

};

Animation.prototype = 
{
	initialize: function(sprite)
	{
		this.m_sprite 		= sprite;
		this.m_crtAFrame 	= 0;
		this.m_crtTime 		= 0;
		this.m_nLoop 		= 0;
		this.m_crtAnim 		= -1;		
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
	
	Init: function(id, loop)
	{
		this.m_nLoop		= loop;
		this.m_bAnimIsOver 	= false;
		this.m_crtAnim		= id;
		this.m_crtAFrame	= 0;
		this.m_crtTime		= 0;
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	SetAnim: function(id, x, y, loop)
	{
		this.SetAnimPos(x, y);
	
		if (id != this.m_crtAnim)
		{
			this.Init(id, loop);
		}
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	Reset: function()
	{	
		this.m_crtAFrame 	= 0;
		this.m_crtTime 		= 0;
		this.m_bAnimIsOver 	= false;
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	IsEnded: function()
	{
		if (this.m_crtAFrame != this.m_sprite.GetAFrames(this.m_crtAnim) - 1)
		{
			return false;
		}
		
		if(this.m_bAnimIsOver)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	SetAnimPos: function(x, y)
	{
		this.m_posX = x;
		this.m_posY = y;
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	Render: function(context)
	{
		
		if (this.m_sprite == null || this.m_crtAnim == -1)
		{
			return;
		}
		if (this.m_crtTime >= 0)
		{
			this.m_sprite.PaintAFrame(context, this.m_crtAnim, this.m_crtAFrame, this.m_posX, this.m_posY);			
		}
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	Update: function()
	{
		if(this.m_crtAnim == -1 || this.m_bAnimIsOver || this.m_sprite == null)
		{
			return;
		}
	
		var duration = this.m_sprite.GetAFrameTime(this.m_crtAnim, this.m_crtAFrame) * 40;

		while (this.m_crtTime >= duration) // could cause a pb if curAnim==-1
		{			
			// update current time to set time for next frame
			this.m_crtTime -= duration;
	
			// pass to next frame or loop or end animation
			if (this.m_crtAFrame < this.m_sprite.GetAFrames(this.m_crtAnim) - 1)
			{
				// pass to next frame
				this.m_crtAFrame++;
			}
			else
			{
				// if end of loop for this animation --> animation is over
				if (this.m_nLoop == 0)
				{
					this.m_bAnimIsOver = true;
					break;
				}
				else
				{
					// decrease nb of loop if not looping forever
					if (this.m_nLoop > 0)
						this.m_nLoop--;
					// reset to first frame of animation
					this.m_crtAFrame = 0;
				}
			}
			// get duration of new frame
			duration = this.m_sprite.GetAFrameTime(this.m_crtAnim, this.m_crtAFrame) * 40;
		}
	
		this.m_crtTime += 40;//Game2D::GetInstance().GetFrameDT();
	},

	m_sprite: null,		
	m_crtAFrame: 0,
	m_crtTime: 0,
	m_nLoop: 0,

	m_bAnimIsOver: 0,

	m_crtAnim: 0,
	m_posX: 0,
	m_posY: 0	
};