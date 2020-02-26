<!doctype html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!-->
	<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->

<head>
	<!-- Prefetch -->
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
	<link rel="dns-prefetch" href="//track.hubspot.com">
	<link rel="dns-prefetch" href="//js.hs-analytics.net">
	<link rel="dns-prefetch" href="//www.google-analytics.com">

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<!-- Force Internet Explorer to use the latest rendering engine available -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<meta charset="utf-8">
	<meta name="theme-color" content="#317EFB" />

	<!-- Page Title -->
	<title><?php wp_title(''); ?></title>

	<!-- Mobile Meta -->
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Device Thumbs -->
	<link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri(); ?>/library/images/apple-touch-icon.png">
	<link rel="icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.png">
	<!--[if IE]>
		<link rel="shortcut icon" href="<?php echo get_stylesheet_directory_uri(); ?>/favicon.ico">
	<![endif]-->
	<?php // or, set /favicon.ico for IE10 win ?>
	<meta name="msapplication-TileColor" content="#f01d4f">
	<meta name="msapplication-TileImage" content="<?php echo get_stylesheet_directory_uri(); ?>/library/images/win8-tile-icon.png">

	<!-- Pingback -->
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

	<!-- Wordpress Head Functions -->
	<?php wp_head(); ?>

	<!-- Call Tracking -->


	<!-- Web Fonts -->
	<link rel="preload" as="style" crossorigin="" href="<?php echo get_template_directory_uri(); ?>/library/css/all.min.css" rel="stylesheet">

	<!-- Add the slick-theme.css if you want default styling -->
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/library/slick/slick.css" />

	<!-- Add the slick-theme.css if you want default styling -->
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/library/slick/slick-theme.css" />

	<!-- Additional Scripts -->
	<?php echo get_field('scripts_header', 'options'); ?>

</head>

<body <?php body_class(); ?>>
	<!-- Additional Scripts -->
	<?php echo get_field('scripts_body', 'options'); ?>

	<div id="site__content" class="flexrow xs--center lg--end">

		<!-- Mobile Navbar -->
		<section id="nav--mobile" class="flexrow xs--around xs--middle xs--align-center md--hide">
			<div id="nav--mobile__search" class="nav--mobile__item xs--1of4 xs--align-center">
				<div id="nav--mobile__search-btn">
					<i class="fas fa-search"></i>
				</div>
			</div>
			<div id="nav--mobile__contact" class="nav--mobile__item xs--1of4 xs--align-center">
				<a href="/about/contact/" title="Contact <?php bloginfo( 'name' ); ?>">
					<i class="fas fa-envelope"></i>
				</a>
			</div>

			<?php if( have_rows('company_phone', 'options') ): ?>
			<div id="nav--mobile__call" class="nav--mobile__item xs--1of4 xs--align-center">
				<?php while( have_rows('company_phone', 'options') ): the_row(); ?>
				<a href="tel:<?php echo get_sub_field('company-phone_link', 'options'); ?>"
					title="Call <?php bloginfo( 'name' ); ?>"><i class="fas fa-phone fa-flip-horizontal"></i></a>
				<?php endwhile; ?>
			</div>
			<?php endif; ?>

			<div id="nav--mobile__menu" class="nav--mobile__item xs--1of4 xs--align-center">
				<div id="nav--mobile__nav-btn">
					<i class="fas fa-bars menu-bars" ></i>
					<i class="fas fa-times hidden menu-exit" ></i>

				</div>
			</div>
		</section>
		<!-- End Mobile Navbar -->

		<!-- MAIN DESKTOP HEADER -->

		<!-- SLIDE OUT NAVIGATION -->
		<div id="site__navigation" class="xs--1 xs--align-left lg--show lg--1of4--full flexrow xs--vertical xs--between">
			<!-- Navigation -->
			<?php include('includes/desktop-menu.php'); ?>
		</div>

		<div id="site__container" class="xs--1">
			<header id="header--global">
				<div id="header--global__container" class="container--full flexrow xs--center xs--middle md--between">

					<!-- Logo -->
					<a id="logo--header" title="<?php bloginfo( 'name' ); ?>" href="<?php echo home_url(); ?>" class="xs--show xs--align-center md--align-left xs--1 md--1of2">
						<img src="<?php echo get_field('logo', 'options'); ?>" alt="<?php bloginfo( 'name' ); ?>" />
					</a>

					<div id="nav--desktop__menu" class="nav--mobile__item xs--1of4 xs--align-center">
						<div id="nav--mobile__nav-btn">
							<i class="fas fa-bars menu-bars" id=""></i>
							<i class="fas fa-times hidden menu-exit" id=""></i>
						</div>
					</div>

				</div> <!-- end of #header--global__container -->
			</header> <!-- end of #header--global -->
