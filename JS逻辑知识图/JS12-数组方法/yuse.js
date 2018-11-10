					//对象 横竖 上下左右值 目标 回调
	function doMove(obj, attr, dir, target, endFN){
		dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;//如果当前位置小于目标位置 就为正的 
																  //如果当前位置大于目标位置 就为负的

		clearInterval(obj.timer);

		obj.timer = setInterval(function(){
			speed = parseInt(getStyle(obj, attr)) + dir;

			//如果当前位置大于目标位置并且方向为正 当前位置等于目标位置 以防超过目标位置停不下来、
			//并且
			//如果当前位置小于目标位置并且方向为负(因为正的向目标走 而负的越走越远) 当前位置等于目标位置 以防超过目标位置停不下来、 
			if (speed > target && dir > 0 || speed < target && dir < 0) {
				speed = target
			}

			obj.style[attr] = speed + 'px';

			if (speed === target) {
				clearInterval(obj.timer);
				if (endFN) {
					endFN();
				}
			}
		},30)
	}

	function getStyle(y, attr){
		return y.currentStyle ? y.currentStyle[ attr ] : getComputedStyle(y)[ attr ];
	}


	function $(y){
		if (typeof y === 'function') {
			window.onload = y;
		}else if (typeof y === 'string') {
			return document.getElementById(y);
		}else if (typeof y === 'object') {
			return y;
		}
	}

	
	function opacity(y, target, speed, endFN){
		var num = 1;
		clearInterval(y.opac);

		y.opac = setInterval(function(){
			num -= 0.1;
			if (target > num) {
				num = target
			}
			y.style.opacity = num;
			if (target === num) {
				clearInterval(y.opac);
				if (endFN) {
					endFN()
				}
			}
		},speed)
	}

	function shake(y, attr,endFN){//请先调用前把y.shakeOff改为ture
		var old = parseInt(getStyle(y, attr));
		var arrtext = [];
		var num = 0;
		for (var i = 20; i > 0; i-=2) {
			arrtext.push(i,-i);
		}
		arrtext.push(0);
		if (y.shakeOff) {
			y.shakeOff = false;
			y.shake = setInterval(function(){
				y.style[attr] = old + arrtext[num] + 'px';
				num++;
				if (num == arrtext.length) {
					clearInterval(y.shake);
					y.shakeOff = true;
					if(endFN){
						endFN();
					}
				}
			},30);
		}

	}

					//给每个程序加上定时器(以防冲突) 未来时间 要变化的东西 回调函数
	function endTime( y, FUture, change,endFN){
		var iNew = new Date(FUture);

		clearInterval( y.timer );

		y.timer = setInterval(function(){
			y.iNow = new Date();

			y.t = Math.floor((iNew - y.iNow) / 1000);

			if (y.t > 0) {
				y.str = Math.floor(y.t/86400) + '年' + Math.floor(y.t%86400/3600) + '时' + Math.floor(y.t%86400%3600/60) + '分' + y.t%60 + '秒';
				change.innerHTML = y.str;
			}else{
				clearInterval( y.timer );

				if(endFN){
					endFN()
				}
			}

		},100)
	};

