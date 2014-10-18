<?php include "assets/php/path.php"; ?>

<!DOCTYPE html>
<html>

	<head>
		<title>FengShui RealTime</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
        <meta name="keywords" content="feng shui, feng shui tips, feng shui bedroom, feng shui colors, feng shui home, feng shui home decorating, feng shui house, feng shui theory, feng shui for health, feng shui for prosperity, feng shui for romance, feng shui office, feng shui decorating, feng shui guide by room, children feng shui, interior design with feng shui">
		<meta name="description" content="Now discover tips and advices to give your home good Feng Shui.">

		<meta content="http://fengshuirealtime.com/" property="og:url">
		<meta content="FengShui RealTime" property="og:title">
		<meta content="Now discover tips and advices to give your home good Feng Shui." property="og:description">
		<meta content="game" property="og:type">
		<meta content="http://fengshuirealtime.com/assets/images/misc/facebook.png" property="og:image">

		<script>(function(w){var dpr=((w.devicePixelRatio===undefined)?1:w.devicePixelRatio);if(!!w.navigator.standalone){var r=new XMLHttpRequest();r.open('GET','assets/php/retinaimages.php?devicePixelRatio='+dpr,false);r.send()}else{document.cookie='devicePixelRatio='+dpr+'; path=/'}})(window)</script>

		<link rel="apple-touch-icon" href="assets/images/misc/icon-iphone.png">
		<link rel="apple-touch-icon" sizes="72x72" href="assets/images/misc/icon-ipad.png">
		<link rel="apple-touch-icon" sizes="114x114" href="assets/images/misc/icon-iphone4.png">
		<link rel="apple-touch-icon" sizes="144x144" href="assets/images/misc/icon-ipad3.png">
		<link rel="shortcut icon" href="assets/images/misc/favicon.ico">
		<link rel="stylesheet" href="assets/styles/css/feng.css" media="screen">
	</head>

	<body>
		<!-- project js -->
		<?php
			$USE_COMPILE_JS = false;
			if (strpos(URLADDR,'dev.') == false && strpos(URLADDR,'local.') == false && strpos(URLADDR,'joe.') == false && strpos(URLADDR,'192.168.1.6') == false) {
		    $USE_COMPILE_JS = true;
			}
			if (isset($_GET['compile'])) {
				$USE_COMPILE_JS = true;
			}
			
			if($USE_COMPILE_JS == true) {
				echo('
					<script src="assets/js/output/thirdparty.js"></script>
					<script src="assets/js/output/feng-compiled.js"></script>
				');
			}else {
				echo('
					<script src="assets/js/thirdparty/howler.min.js"></script>
					<script src="assets/js/thirdparty/createjs/preloadjs-0.4.1.min.js"></script>
					<script src="assets/js/thirdparty/greensock/TweenMax.min.js"></script>
					<script src="assets/js/thirdparty/greensock/utils/Draggable.min.js"></script>
					
					<script src="assets/js/thirdparty/threejs/build/three68.min.js"></script>

					<script src="assets/js/thirdparty/threejs-utils/CombinedCamera.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/EffectComposer.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/RenderPass.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/ShaderPass.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/TexturePass.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/MaskPass.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/BloomPass.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/CopyShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/FXAAShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/VignetteShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/TriangleBlurShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/BrightnessContrastShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/HueSaturationShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/ConvolutionShader.js"></script>
					<script src="assets/js/thirdparty/threejs-utils/OrbitControls.js"></script>
					<script src="assets/js/thirdparty/pathfinding-browser.min.js"></script>

					<script src="http://localhost:35729/livereload.js"></script>
					<script src="assets/js/thirdparty/closure-library/closure/goog/base.js"></script>
					<script src="assets/js/output/feng-deps.js"></script>
					<script src="assets/js/project/feng.js"></script>
				');
			}
		?>

		<!-- execute project js-->
		<script>
			var config = {
				basePath: '<?php echo URLADDR; ?>',
				assetsPath: '<?php echo URLADDR; ?>'+'assets/',
				app: 'demo',//'pathedit',
				quality: 'high',
				debug: !true,
				office: !true
			};

			feng.init( config );
		</script>
	</body>

</html>