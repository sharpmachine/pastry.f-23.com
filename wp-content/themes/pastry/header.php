<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php
	global $page, $paged;
	wp_title( '|', true, 'right' );
	bloginfo( 'name' );
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";
	if ( $paged >= 2 || $page >= 2 )
		echo ' | ' . sprintf( __( 'Page %s', 'patry' ), max( $paged, $page ) );
	?></title>
<meta name="description" content="<?php bloginfo('description'); ?>" />
<meta name="keywords" content="" />
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/favicon.png" />
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>

<script src="<?php bloginfo('template_directory') ?>/assets/js/easing.js"></script>
<script src="<?php bloginfo('template_directory') ?>/assets/js/cycle.js"></script>
<script src="<?php bloginfo('template_directory') ?>/assets/js/slimbox.js"></script>
<script src="<?php bloginfo('template_directory') ?>/assets/js/jquery.lifestream.js"></script>
<script src="<?php bloginfo('template_directory') ?>/assets/js/scripts.js"></script>

</script>

<?php  while(the_repeater_field('sliders_options', 'options')) { ?>
<script>
jQuery(document).ready(function($){
	$('ul.prime li').has('.sub-menu').append('<span class="arrow">+</span>').addClass('sub');
	$('.tabs').tabs();
	$('#slideshow .cycle').cycle({
		fx: '<?php echo get_sub_field('featured')?>',
		pager: '#slideshow .cycle-pager',
		easing: 'easeInOutExpo'
	});
	$('#freshly-baked .cycle').cycle({
		fx: '<?php echo get_sub_field('freshly_baked')?>',
		pager: '#freshly-baked .cycle-pager',
		easing: 'easeInOutExpo'
	});
	$('#team-supply .cycle').cycle({
		fx: '<?php echo get_sub_field('team_supply')?>',
		pager: '#team-supply .cycle-pager',
		easing: 'easeInOutExpo'
	});
	$('#by-artists .explore-posts').cycle({
		fx: '<?php echo get_sub_field('explore')?>',
		easing: 'easeInOutExpo',
		prev: '#by-artists .prev',
		next: '#by-artists .next',
		timeout: 0
	});
	$('.grams').cycle({
		fx: 'scrollHorz',
		easing: 'easeInOutExpo',
		prev: '#instagram-carousel .prev',
		next: '#instagram-carousel .next',
		timeout: 0		
	});
	$(".tweet").tweet({
	  join_text: "auto",
	  username: "lovepastry",
	  avatar_size: 48,
	  count: 3,
	  template: "{text}"
	});	
	$(".tweetall").tweet({
	  join_text: "auto",
	  username: "lovepastry",
	  avatar_size: 48,
	  count: 1,
	  template: "{single_text}"
	});	
});
</script>
<?php } ?>

<?php
	if ( is_singular() && get_option( 'thread_comments' ) )
		wp_enqueue_script( 'comment-reply' );
	wp_head();
?>

</head>
<body <?php body_class(); ?>>

	<div id="wrap">	

		<header>
			<hgroup>
				<nav id="top">
					<ul>
						<li class="sign-in"><a href="">Sign In</a></li>
						<li class="wishlist"><a href="">Wishlist</a></li>
						<li class="my-cart"><a href="">My Cart</a></li>
					</ul>
				</nav>
			</hgroup>
			<nav id="main">
				<h1 id="logo"><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?>&trade;</a></h1>

<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => '', 'items_wrap' => '<ul class="prime">%3$s</ul>' ) ); ?>

			</nav>
			<div id="search-box">
			<form>
				<input type="text" placeholder="Search">
			</form>
			</div><!-- #main -->
		</header>