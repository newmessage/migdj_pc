/*
* Copyright (c) 2012 La Minh Truong
*/

SpriteAurora = function (data) {

};

SpriteAurora.prototype = 
{
	initialize: function()
	{
		
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	Load: function(reader)
	{
		var off = 0;
	    var len = 0;
	
	    // Modules info
	    this.m_nModuleCount		= reader.readUInt16();
	    this.m_pModuleX 		= new Array();
		this.m_pModuleY 		= new Array();
		this.m_pModuleW 		= new Array();
		this.m_pModuleH 		= new Array();
		    
		for (var i = 0; i < this.m_nModuleCount; i++)
		{
			this.m_pModuleX.push(reader.readInt16());
			this.m_pModuleY.push(reader.readInt16());
			this.m_pModuleW.push(reader.readInt16());
			this.m_pModuleH.push(reader.readInt16());
		}
	
	    // Frames info
	    this.m_nFrameCount = reader.readUInt16();			
	    if (this.m_nFrameCount > 0)
	    {
	    	// FModule info
	    	this.m_pFModule			= new Array();
	        this.m_pFModuleStart 	= new Array();

	    	// Frame rect
	    	this.m_pFrameMinX		= new Array();
	    	this.m_pFrameMinY		= new Array();
	    	this.m_pFrameMaxX		= new Array();
	    	this.m_pFrameMaxY		= new Array();

	        for (var i = 0; i < this.m_nFrameCount; i++)
	        {
	            this.m_pFrameMinX.push(reader.readUInt16());
	            this.m_pFrameMinY.push(reader.readUInt16());
	            this.m_pFrameMaxX.push(reader.readUInt16());
	            this.m_pFrameMaxY.push(reader.readUInt16());
	        }	      
	
	        len = 0;
	        for (var i = 0; i < this.m_nFrameCount; i++)
	        {
	            this.m_pFModuleStart.push(len);
	            this.m_pFModule.push(reader.readUInt8());
				len += this.m_pFModule[i];
	        }
	
			this.m_pFModuleId			= new Array();
			this.m_pFModuleOffsetX		= new Array();
			this.m_pFModuleOffsetY		= new Array();			
			this.m_pFModuleAngle		= new Array();
			this.m_pFModuleScaleX		= new Array();
			this.m_pFModuleScaleY		= new Array();
			this.m_pFModulePivotX		= new Array();
			this.m_pFModulePivotY		= new Array();


			for (var i = 0; i < len; i++)
			{
				this.m_pFModuleId.push(reader.readUInt16());
				this.m_pFModuleOffsetX.push(reader.readInt16());
				this.m_pFModuleOffsetY.push(reader.readInt16());
				this.m_pFModuleAngle.push(reader.readInt16());
				this.m_pFModuleScaleX.push(reader.readInt16());
				this.m_pFModuleScaleY.push(reader.readInt16());
				this.m_pFModulePivotX.push(reader.readInt16());
				this.m_pFModulePivotY.push(reader.readInt16());
			}
	    }
	
	    // Anim info
	    this.m_nAnimCount = reader.readUInt16();	
	    if (this.m_nAnimCount > 0)
	    {
	        this.m_pAFrame		= new Array();
	        this.m_pAFrameStart	= new Array();
	
	        len = 0;
	        for (var i = 0; i < this.m_nAnimCount; i++)
	        {
	            this.m_pAFrameStart.push(len);
	            this.m_pAFrame.push(reader.readUInt16());
	            len += this.m_pAFrame[i]; 
	        }
	
			this.m_pAFrameId			= new Array();
			this.m_pAFrameInterval		= new Array();
			this.m_pAFrameX				= new Array();
			this.m_pAFrameY				= new Array();
			this.m_pAFrameAngle			= new Array();
			this.m_pAFrameScaleX		= new Array();
			this.m_pAFrameScaleY		= new Array();
			this.m_pAFramePivotX		= new Array();
			this.m_pAFramePivotY		= new Array();
	
			for (var i = 0; i < len; i++)
			{
				this.m_pAFrameId.push(reader.readUInt16());
				this.m_pAFrameInterval.push(reader.readUInt8());
				this.m_pAFrameX.push(reader.readInt16());
				this.m_pAFrameY.push(reader.readInt16());
				this.m_pAFrameAngle.push(reader.readInt16());
				this.m_pAFrameScaleX.push(reader.readInt16());
				this.m_pAFrameScaleY.push(reader.readInt16());
				this.m_pAFrameScaleX.push(reader.readInt16());
				this.m_pAFrameScaleY.push(reader.readInt16());
			}
		}
	},
	

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
	
	SetImage: function(img)
	{
		this.m_img = new Image();
		this.m_img.src = img;
	},
	

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	PaintModule: function(context, module, x, y, scaleX, scaleY, angle)
	{
		var angleInRad = angle * Math.PI / 180;

		context.translate(x, y);
		context.rotate(angleInRad);
		context.drawImage(this.m_img, this.m_pModuleX[module], this.m_pModuleY[module], this.m_pModuleW[module], this.m_pModuleH[module], 0, 0, this.m_pModuleW[module] * scaleX, this.m_pModuleH[module] * scaleY);
		context.rotate(-angleInRad);
		context.translate(-x, -y);
	},


//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
	
	PaintFModule: function(context, frame, module, posX, posY, flags)
	{
	    var off		= this.m_pFModuleStart[frame] + module;
	    var fm 		= this.m_pFModuleId[off];
	    var ox		= this.m_pFModuleOffsetX[off];
		var oy		= this.m_pFModuleOffsetY[off];
	    var angle   = this.m_pFModuleAngle[off];
        var scale_x = this.m_pFModuleScaleX[off] / 100;
        var scale_y = this.m_pFModuleScaleX[off] / 100;
        var pivot_x = this.m_pFModulePivotX[off];
        var pivot_y = this.m_pFModulePivotY[off];
	
	    this.PaintModule(context, fm, posX + ox, posY + oy, scale_x, scale_y, angle);
	},


//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	PaintFrame: function(context, frame, posX, posY, flags)
	{
	    var nFModules = this.GetFModules(frame);
		for (var i = 0; i < nFModules; i++)
	    {
	        this.PaintFModule(context, frame, i, posX, posY, flags);
	    }
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	PaintAFrame: function(context, anim, frame, posX, posY)
	{
	    var off	  = this.m_pAFrameStart[anim] + frame;
	    var af	  = this.m_pAFrameId[off];
		var ox	  = this.m_pAFrameX[off];
		var oy	  = this.m_pAFrameY[off];
	    var flags = 0;//this.m_pAFrameFlags[off];
		
	    this.PaintFrame(context, af, posX + ox, posY + oy, flags);
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	GetAFrameId: function(anim, frame)
	{
		var off	= this.m_pAFrameStart[anim] + frame;
	    return this.m_pAFrameId[off];
	},
	
//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	GetAFrameTime: function(anim, frame)
	{
	    var off	= this.m_pAFrameStart[anim] + frame;
	    return this.m_pAFrameInterval[off];
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	GetAFrames: function(anim)
	{
	    return this.m_pAFrame[anim];
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	GetFModules: function(frame)
	{
	    return this.m_pFModule[frame];
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	GetModulesWidth: function(module)
	{
	    return this.m_pModuleW[module];
	},

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

	GetModulesHeight: function(module)
	{
	    return this.m_pModuleH[module];
	},

	m_img: 0,
	
	m_nModuleCount: 0,
	m_nFrameCount: 0,
	m_nAnimCount:0 ,
	
	m_pModuleX: 0,
	m_pModuleY: 0,
	m_pModuleW: 0,
	m_pModuleH: 0,
	m_pModuleData: 0,

	m_pFModuleId: 0,
	m_pFModuleOffsetX: 0,
	m_pFModuleOffsetY: 0,
	m_pFModuleAngle: 0,
	m_pFModuleScaleX: 0,
	m_pFModuleScaleY: 0,
	m_pFModulePivotX: 0,
	m_pFModulePivotY: 0,
	m_pFModule: 0,
	m_pFModuleStart: 0,

	m_pFrameMinX: 0,
	m_pFrameMinY: 0,
	m_pFrameMaxX: 0,
	m_pFrameMaxY: 0,

	m_pAFrameId: 0,
	m_pAFrameInterval: 0,
	m_pAFrameX: 0,
	m_pAFrameY: 0,
	m_pAFrameAngle: 0,
	m_pAFrameScaleX: 0,
	m_pAFrameScaleY: 0,
	m_pAFramePivotX: 0,
	m_pAFramePivotY: 0,
	m_pAFrame: 0,
	m_pAFrameStart: 0
	
};