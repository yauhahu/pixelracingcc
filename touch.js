var ongoingTouches = [];


function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById ( idToFind ) {
		for (var i = 0; i < ongoingTouches.length; i++) {
			var id = ongoingTouches[i].identifier;
			if ( id == idToFind ) { return i; }
		}
		return -1;    // not found
	}

class TouchControl 
{
	constructor(canvasTarget) // e.g. canvasTarget = document.getElementById("canvas")
	{
		this.target = canvasTarget;
		canvasTarget.addEventListener("touchstart", this.handleStart, false);
		canvasTarget.addEventListener("touchend", this.handleEnd, false);
		canvasTarget.addEventListener("touchcancel", this.handleCancel, false);
		canvasTarget.addEventListener("touchmove", this.handleMove, false);
	}
	
	update ()
	{
		console.log("touch update called");
	}

	handleStart(e) 
	{
		e.preventDefault();
		var touches = e.changedTouches;
		
		for (var i = 0; i < touches.length; i++) 
		{
			ongoingTouches.push(copyTouch(touches[i]));
		}
	} // end handle touch-start

	handleMove(e) 
	{
		e.preventDefault();
		var touches = e.changedTouches;

		for (var i = 0; i < touches.length; i++) 
		{
			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) 
			{
				ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
			} 
			else 
			{
				console.log("can't figure out which touch to continue");
			}
		}
	} // end handle touch-move
	
	handleEnd(e) 
	{
		e.preventDefault();
		var touches = e.changedTouches;

		for (var i = 0; i < touches.length; i++) 
		{
			//console.log ( "ended touch: (" + touches[i].pageX + ", " + touches[i].pageY + ") " );

			var idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) 
			{
				ongoingTouches.splice(idx, 1);  // remove it; we're done
			} 
			else 
			{
				console.log("can't figure out which touch to end");
			}
		}
	} // end handle touch-end

	handleCancel(e) 
	{
		e.preventDefault();
		var touches = e.changedTouches;
  
		for (var i = 0; i < touches.length; i++) 
		{
			var idx = ongoingTouchIndexById(touches[i].identifier);
			ongoingTouches.splice(idx, 1);  // remove it; we're done
		}
	} // end handle touch-cancel
	
	

} // end of touchDetector class