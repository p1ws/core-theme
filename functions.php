<?php
/*
Author: P1WS
URL: https://www.p1ws.com/

This is where you can drop your custom functions or
just edit things like thumbnail sizes, header images,
sidebars, comments, etc.
*/


// CUSTOMIZE THE WORDPRESS ADMIN (off by default)
// require_once( 'library/admin.php' );

/*********************
LAUNCH P1WS CORE
Let's get everything up and running.
*********************/

function p1ws_init() {

  //Allow editor style.
  add_editor_style( get_stylesheet_directory_uri() . '/library/css/editor-style.css' );

  // launching operation cleanup
  add_action( 'init', 'p1ws_head_cleanup' );
  // A better title
  add_filter( 'wp_title', 'rw_title', 10, 3 );
  // remove WP version from RSS
  add_filter( 'the_generator', 'p1ws_rss_version' );
  // remove pesky injected css for recent comments widget
  add_filter( 'wp_head', 'p1ws_remove_wp_widget_recent_comments_style', 1 );
  // clean up comment styles in the head
  add_action( 'wp_head', 'p1ws_remove_recent_comments_style', 1 );
  // clean up gallery output in wp
  add_filter( 'gallery_style', 'p1ws_gallery_style' );

  // enqueue base scripts and styles
  add_action( 'wp_enqueue_scripts', 'p1ws_scripts_and_styles', 999 );
  // ie conditional wrapper

  // launching this stuff after theme setup
  p1ws_theme_support();

  // adding sidebars to Wordpress (these are created in functions.php)
  add_action( 'widgets_init', 'p1ws_register_sidebars' );

  // cleaning up random code around images
  add_filter( 'the_content', 'p1ws_filter_ptags_on_images' );
  // cleaning up excerpt
  add_filter( 'excerpt_more', 'p1ws_excerpt_more' );

} /* end P1WS init */

// let's get this party started
add_action( 'after_setup_theme', 'p1ws_init' );

/************* OEMBED SIZE OPTIONS *************/

if ( ! isset( $content_width ) ) {
	$content_width = 680;
}

/************* THUMBNAIL SIZE OPTIONS *************/

// Thumbnail sizes
add_image_size( 'p1ws-thumb-600', 600, 150, true );
add_image_size( 'p1ws-thumb-300', 300, 100, true );

/*
to add more sizes, simply copy a line from above
and change the dimensions & name. As long as you
upload a "featured image" as large as the biggest
set width or height, all the other sizes will be
auto-cropped.

To call a different size, simply change the text
inside the thumbnail function.

For example, to call the 300 x 100 sized image,
we would use the function:
<?php the_post_thumbnail( 'p1ws-thumb-300' ); ?>
for the 600 x 150 image:
<?php the_post_thumbnail( 'p1ws-thumb-600' ); ?>

You can change the names and dimensions to whatever
you like. Enjoy!
*/

add_filter( 'image_size_names_choose', 'p1ws_custom_image_sizes' );

function p1ws_custom_image_sizes( $sizes ) {
	 return array_merge( $sizes, array(
		  'p1ws-thumb-600' => __('600px by 150px'),
		  'p1ws-thumb-300' => __('300px by 100px'),
	 ) );
}

/*
The function above adds the ability to use the dropdown menu to select
the new images sizes you have just created from within the media manager
when you add media to your content blocks. If you add more image sizes,
duplicate one of the lines in the array and name it according to your
new image size.
*/


/************* ACTIVE SIDEBARS ********************/

// Sidebars & Widgetizes Areas
function p1ws_register_sidebars() {
	register_sidebar(array(
		'id' => 'sidebar1',
		'name' => __( 'Sidebar 1', 'p1wscore' ),
		'description' => __( 'The first (primary) sidebar.', 'p1wscore' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	));
	// P1WS Universal Sidebar
	register_sidebar(array(
		'id' => 'p1ws',
		'name' => __( 'P1WS Sidebar', 'bonestheme' ),
		'description' => __( 'Pulls in subpages for sidebar.', 'bonestheme' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	)); 
} // don't remove this bracket!




function p1ws_head_cleanup() {
	// EditURI link
	remove_action( 'wp_head', 'rsd_link' );
	// windows live writer
	remove_action( 'wp_head', 'wlwmanifest_link' );
	// previous link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	// start link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	// links for adjacent posts
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
	// WP version
	remove_action( 'wp_head', 'wp_generator' );
	// remove WP version from css
	add_filter( 'style_loader_src', 'p1ws_remove_wp_ver_css_js', 9999 );
	// remove Wp version from scripts
	add_filter( 'script_loader_src', 'p1ws_remove_wp_ver_css_js', 9999 );

} /* end P1WS head cleanup */

// A better title
// http://www.deluxeblogtips.com/2012/03/better-title-meta-tag.html
function rw_title( $title, $sep, $seplocation ) {
  global $page, $paged;

  // Don't affect in feeds.
  if ( is_feed() ) return $title;

  // Add the blog's name
  if ( 'right' == $seplocation ) {
    $title .= get_bloginfo( 'name' );
  } else {
    $title = get_bloginfo( 'name' ) . $title;
  }

  // Add the blog description for the home/front page.
  $site_description = get_bloginfo( 'description', 'display' );

  if ( $site_description && ( is_home() || is_front_page() ) ) {
    $title .= " {$sep} {$site_description}";
  }

  // Add a page number if necessary:
  if ( $paged >= 2 || $page >= 2 ) {
    $title .= " {$sep} " . sprintf( __( 'Page %s', 'dbt' ), max( $paged, $page ) );
  }

  return $title;

} // end better title

// remove WP version from RSS
function p1ws_rss_version() { return ''; }

// remove WP version from scripts
function p1ws_remove_wp_ver_css_js( $src ) {
	if ( strpos( $src, 'ver=' ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}

// remove injected CSS for recent comments widget
function p1ws_remove_wp_widget_recent_comments_style() {
	if ( has_filter( 'wp_head', 'wp_widget_recent_comments_style' ) ) {
		remove_filter( 'wp_head', 'wp_widget_recent_comments_style' );
	}
}

// remove injected CSS from recent comments widget
function p1ws_remove_recent_comments_style() {
	global $wp_widget_factory;
	if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
		remove_action( 'wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style') );
	}
}

// remove injected CSS from gallery
function p1ws_gallery_style($css) {
	return preg_replace( "!<style type='text/css'>(.*?)</style>!s", '', $css );
}


/*********************
SCRIPTS & ENQUEUEING
*********************/

// loading modernizr and jquery, and reply script
function p1ws_scripts_and_styles() {

  global $wp_styles; // call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

  if (!is_admin()) {

		// modernizr (without media query polyfill)
		wp_register_script( 'p1ws-modernizr', get_stylesheet_directory_uri() . '/library/js/libs/modernizr.custom.min.js', array(), '2.5.3', true );

		// register main stylesheet
		wp_register_style( 'p1ws-stylesheet', get_stylesheet_directory_uri() . '/library/css/style.css', array(), '', 'all' );

		// ie-only style sheet
		wp_register_style( 'p1ws-ie-only', get_stylesheet_directory_uri() . '/library/css/ie.css', array(), '' );

    // comment reply script for threaded comments
    if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
		  wp_enqueue_script( 'comment-reply' );
    }

		//adding scripts file in the footer
		wp_register_script( 'p1ws-js', get_stylesheet_directory_uri() . '/library/js/scripts.js', array( 'jquery' ), '', true );

		// enqueue styles and scripts
		wp_enqueue_script( 'p1ws-modernizr' );
		wp_enqueue_style( 'p1ws-stylesheet' );
		wp_enqueue_style( 'p1ws-ie-only' );

		$wp_styles->add_data( 'p1ws-ie-only', 'conditional', 'lt IE 9' ); // add conditional wrapper around ie stylesheet

		/*
		I recommend using a plugin to call jQuery
		using the google cdn. That way it stays cached
		and your site will load faster.
		*/
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'p1ws-js' );

	}
}

/*********************
THEME SUPPORT
*********************/

// Adding WP 3+ Functions & Theme Support
function p1ws_theme_support() {

	// wp thumbnails (sizes handled in functions.php)
	add_theme_support( 'post-thumbnails' );

	// default thumb size
	set_post_thumbnail_size(125, 125, true);

	// wp custom background (thx to @bransonwerner for update)
	add_theme_support( 'custom-background',
	    array(
	    'default-image' => '',    // background image default
	    'default-color' => '',    // background color default (dont add the #)
	    'wp-head-callback' => '_custom_background_cb',
	    'admin-head-callback' => '',
	    'admin-preview-callback' => ''
	    )
	);

	// rss thingy
	add_theme_support('automatic-feed-links');

	// to add header image support go here: http://themble.com/support/adding-header-background-image-support/

	// adding post format support
	add_theme_support( 'post-formats',
		array(
			'aside',             // title less blurb
			'gallery',           // gallery of images
			'link',              // quick link to other site
			'image',             // an image
			'quote',             // a quick quote
			'status',            // a Facebook like status update
			'video',             // video
			'audio',             // audio
			'chat'               // chat transcript
		)
	);

	// wp menus
	add_theme_support( 'menus' );

	// registering wp3+ menus
	register_nav_menus(
		array(
			'main-nav' => __( 'The Main Menu', 'p1wscore' ),   // main nav in header
			'footer-links' => __( 'Footer Links', 'p1wscore' ) // secondary nav in footer
		)
	);

	// Enable support for HTML5 markup.
	add_theme_support( 'html5', array(
		'comment-list',
		'search-form',
		'comment-form'
	) );

} /* end P1WSCore theme support */


/*********************
RELATED POSTS FUNCTION
*********************/

// Related Posts Function (call using p1ws_related_posts(); )
function p1ws_related_posts() {
	echo '<ul id="p1ws-related-posts">';
	global $post;
	$tags = wp_get_post_tags( $post->ID );
	if($tags) {
		foreach( $tags as $tag ) {
			$tag_arr .= $tag->slug . ',';
		}
		$args = array(
			'tag' => $tag_arr,
			'numberposts' => 5, /* you can change this to show more */
			'post__not_in' => array($post->ID)
		);
		$related_posts = get_posts( $args );
		if($related_posts) {
			foreach ( $related_posts as $post ) : setup_postdata( $post ); ?>
				<li class="related_post"><a class="entry-unrelated" href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></li>
			<?php endforeach; }
		else { ?>
			<?php echo '<li class="no_related_post">' . __( 'No Related Posts Yet!', 'p1wscore' ) . '</li>'; ?>
		<?php }
	}
	wp_reset_postdata();
	echo '</ul>';
} /* end P1WS related posts function */

/*********************
PAGE NAVI
*********************/

// Numeric Page Navi (built into the theme by default)
function p1ws_page_navi() {
  global $wp_query;
  $bignum = 999999999;
  if ( $wp_query->max_num_pages <= 1 )
    return;
  echo '<nav class="pagination">';
  echo paginate_links( array(
    'base'         => str_replace( $bignum, '%#%', esc_url( get_pagenum_link($bignum) ) ),
    'format'       => '',
    'current'      => max( 1, get_query_var('paged') ),
    'total'        => $wp_query->max_num_pages,
    'prev_text'    => '&larr;',
    'next_text'    => '&rarr;',
    'type'         => 'list',
    'end_size'     => 3,
    'mid_size'     => 3
  ) );
  echo '</nav>';
} /* end page navi */

/*********************
RANDOM CLEANUP ITEMS
*********************/

// remove the p from around imgs (http://css-tricks.com/snippets/wordpress/remove-paragraph-tags-from-around-images/)
function p1ws_filter_ptags_on_images($content){
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}

// This removes the annoying […] to a Read More link
function p1ws_excerpt_more($more) {
	global $post;
	// edit here if you like
	return '...  <a class="excerpt-read-more" href="'. get_permalink( $post->ID ) . '" title="'. __( 'Read ', 'p1wscore' ) . esc_attr( get_the_title( $post->ID ) ).'">'. __( 'Read more &raquo;', 'p1wscore' ) .'</a>';
}


// Add ACF options page
if ( function_exists( 'acf_add_options_page' ) ) :
	acf_add_options_page(array(
		'page_title' => 'Site Options',
		'menu_title' => 'Site Options',
		'menu_slug' => 'site-options',
		'capability' => 'edit_posts',
		'redirect' => false
	));		 
endif;


// Move Yoast SEO meta box to bottom of page
add_filter( 'wpseo_metabox_prio', 'p1ws_metaboxbottom');

if ( ! function_exists( 'p1ws_metaboxbottom ' ) ) :
	function p1ws_metaboxbottom() {
		return 'low';
	}
endif;


// Replace WordPress logo on admin login screen 
function my_login_logo() { ?>
    <style type="text/css">
	#login h1 a, .login h1 a {
		background-image: url(<?php echo get_template_directory_uri(); ?>/library/images/logo.png);
		height:65px;
		width:100%;
		background-size: contain;
		background-repeat: no-repeat;
		padding-bottom: 30px;
	}
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );


// Remove nofollow attributes from post content
function remove_nofollow($string) {
	$string = str_ireplace(' rel="nofollow"', '', $string);
	return $string;
}
add_filter('the_content', 'remove_nofollow');


// Remove Yoast Schema in 11.0 +
//add_filter( 'wpseo_json_ld_output', '__return_false' );

// (Alt 1) Remove Yoast Schema in 11.0 +
//add_filter( 'wpseo_json_ld_output', function( $this_data, $context ){return false; }, 10, 2 );

// (Alt 2) Remove Yoast Schema in 11.0 +
//add_filter( 'wpseo_json_ld_output', 'remove_yoast_schema', 10, 2 );
//function remove_yoast_schema( $this_data, $context ) {
//	return false;
//}


// Register /wp-includes/js/jquery/jquery.js in footer
function move_jquery_into_footer( $wp_scripts ) {

    if( is_admin() ) {
        return;
    }

    $wp_scripts->add_data( 'jquery', 'group', 1 );
    $wp_scripts->add_data( 'jquery-core', 'group', 1 );
    $wp_scripts->add_data( 'jquery-migrate', 'group', 1 );
}
add_action( 'wp_default_scripts', 'move_jquery_into_footer' );


add_filter( 'body_class', 'custom_class' );
function custom_class( $classes ) {
    if ( is_page_template( 'page-home.php' ) ) {
        $classes[] = 'example';
    }
    return $classes;
}

//Function to create cache directory for wp-scss plugin if it doesn't exist
// add_action( 'init', 'wp_scss_check_for_sass_cache' );
// function wp_scss_check_for_sass_cache() {
// $wp_scss_path = ABSPATH . 'wp-content/plugins/wp-scss';
// //Check to make sure plugin exists
// if ( file_exists( $wp_scss_path ) ) {
// $wp_scss_cache_path = $wp_scss_path . '/cache';
// //Check to make see if cache directory exists, and if not create it
// if ( ! file_exists( $wp_scss_cache_path ) ) {
// mkdir( $wp_scss_cache_path, 0755 );
// }
// }
// }


function custom_excerpt_more_link($more){
  return '<a href="' . get_the_permalink() . '" rel="nofollow">&nbsp;[more]</a>';
}

add_filter('excerpt_more', 'custom_excerpt_more_link');



/* DON'T DELETE THIS CLOSING TAG */ ?> 