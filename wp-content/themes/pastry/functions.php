<?


function string_limit_words($string, $word_limit)
{
  $words = explode(' ', $string, ($word_limit + 1));
  if(count($words) > $word_limit)
  array_pop($words);
  return implode(' ', $words);
}


remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'rsd_link');
remove_action( 'wp_head', 'wlwmanifest_link');
remove_action( 'wp_head', 'index_rel_link');
remove_action( 'wp_head', 'parent_post_rel_link_wp_head', 10, 0);
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action( 'wp_head', 'wp_generator');
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head', 'start_post_rel_link');

function pastry_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
}
add_action( 'widgets_init', 'pastry_remove_recent_comments_style' );

if ( function_exists('register_sidebar') )
    	register_sidebar(array(
		'name'=>'Sidebar',
		'id' => 'primary-widget-area',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h2>',
		'after_title' => '</h2>'
	));

	//add_action( 'widgets_init', 'pastry_widgets_init' );

add_theme_support('post-thumbnails');
	register_nav_menus( array(
		'primary' => __( 'Primary Navigation', 'pastry' ),
		'secondary' => __( 'Secondary Navigation', 'pastry' ),
	) );

add_theme_support( 'automatic-feed-links' );

/**
 * Activate Add-ons
 * Here you can enter your activation codes to unlock Add-ons to use in your theme. 
 * Since all activation codes are multi-site licenses, you are allowed to include your key in premium themes. 
 * Use the commented out code to update the database with your activation code. 
 * You may place this code inside an IF statement that only runs on theme activation.
 */ 
 
// if(!get_option('acf_repeater_ac')) update_option('acf_repeater_ac', "xxxx-xxxx-xxxx-xxxx");
// if(!get_option('acf_options_page_ac')) update_option('acf_options_page_ac', "xxxx-xxxx-xxxx-xxxx");
// if(!get_option('acf_flexible_content_ac')) update_option('acf_flexible_content_ac', "xxxx-xxxx-xxxx-xxxx");
// if(!get_option('acf_gallery_ac')) update_option('acf_gallery_ac', "xxxx-xxxx-xxxx-xxxx");


/**
 * Register field groups
 * The register_field_group function accepts 1 array which holds the relevant data to register a field group
 * You may edit the array as you see fit. However, this may result in errors if the array is not compatible with ACF
 * This code must run every time the functions.php file is read
 */

if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => '507eb5597644f',
		'title' => 'Homepage Options',
		'fields' => 
		array (
			0 => 
			array (
				'key' => 'field_507c749012c89',
				'label' => 'Featured Slides',
				'name' => 'featured_slides',
				'type' => 'repeater',
				'instructions' => '',
				'required' => '0',
				'sub_fields' => 
				array (
					0 => 
					array (
						'key' => 'field_507c749013457',
						'label' => 'Featured Preview',
						'name' => 'featured_preview',
						'type' => 'image',
						'instructions' => 'W:1000px H:520px',
						'column_width' => '',
						'save_format' => 'url',
						'preview_size' => 'large',
						'order_no' => '0',
					),
					1 => 
					array (
						'key' => 'field_507c74901383e',
						'label' => 'Featured Link',
						'name' => 'featured_link',
						'type' => 'page_link',
						'instructions' => '',
						'column_width' => '',
						'post_type' => 
						array (
							0 => '',
						),
						'allow_null' => '0',
						'multiple' => '0',
						'order_no' => '1',
					),
				),
				'row_min' => '0',
				'row_limit' => '',
				'layout' => 'row',
				'button_label' => 'Add Slide',
				'order_no' => '0',
			),
			1 => 
			array (
				'key' => 'field_507c73579dd7c',
				'label' => 'Freshly Baked',
				'name' => 'freshly_baked',
				'type' => 'repeater',
				'instructions' => '',
				'required' => '0',
				'sub_fields' => 
				array (
					0 => 
					array (
						'key' => 'field_507c73579e984',
						'label' => 'FB Preview',
						'name' => 'fb_preview',
						'type' => 'image',
						'instructions' => 'W:355px H:505px',
						'column_width' => '',
						'save_format' => 'url',
						'preview_size' => 'medium',
						'order_no' => '0',
					),
					1 => 
					array (
						'key' => 'field_507c73579f34d',
						'label' => 'FB Link',
						'name' => 'fb_link',
						'type' => 'page_link',
						'instructions' => '',
						'column_width' => '',
						'post_type' => 
						array (
							0 => '',
						),
						'allow_null' => '0',
						'multiple' => '0',
						'order_no' => '1',
					),
				),
				'row_min' => '0',
				'row_limit' => '',
				'layout' => 'table',
				'button_label' => 'Add Slide',
				'order_no' => '1',
			),

			

			2 => 
			array (
				'key' => 'field_507c73579dd7f',
				'label' => 'Team Supply',
				'name' => 'team_supply',
				'type' => 'repeater',
				'instructions' => '',
				'required' => '0',
				'sub_fields' => 
				array (
					0 => 
					array (
						'key' => 'field_507c73579e987',
						'label' => 'FB Preview',
						'name' => 'fb_preview2',
						'type' => 'image',
						'instructions' => 'W:355px H:505px',
						'column_width' => '',
						'save_format' => 'url',
						'preview_size' => 'medium',
						'order_no' => '0',
					),
					1 => 
					array (
						'key' => 'field_507c73579f34s',
						'label' => 'FB Link',
						'name' => 'fb_link2',
						'type' => 'page_link',
						'instructions' => '',
						'column_width' => '',
						'post_type' => 
						array (
							0 => '',
						),
						'allow_null' => '0',
						'multiple' => '0',
						'order_no' => '1',
					),
				),
				'row_min' => '0',
				'row_limit' => '',
				'layout' => 'table',
				'button_label' => 'Add Slide',
				'order_no' => '2',
			),


			
			3 => 
			array (
				'key' => 'field_507c73c639f6c',
				'label' => 'Fresh out of oven',
				'name' => 'fresh_out_of_oven',
				'type' => 'relationship',
				'instructions' => 'Maximum of 2 posts.',
				'required' => '0',
				'post_type' => 
				array (
					0 => 'post',
					1 => 'page',
				),
				'taxonomy' => 
				array (
					0 => 'all',
				),
				'max' => '2',
				'order_no' => '3',
			),
		),
		'location' => 
		array (
			'rules' => 
			array (
				0 => 
				array (
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'home.php',
					'order_no' => '0',
				),
			),
			'allorany' => 'all',
		),
		'options' => 
		array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => 
			array (
				0 => 'the_content',
				1 => 'excerpt',
			),
		),
		'menu_order' => 0,
	));
	register_field_group(array (
		'id' => '507eb55977bbb',
		'title' => 'Theme Options',
		'fields' => 
		array (
			0 => 
			array (
				'key' => 'field_507cdb310c144',
				'label' => 'Social Links',
				'name' => 'social_links',
				'type' => 'repeater',
				'instructions' => 'This will fill in all the social links through out the site.',
				'required' => '0',
				'sub_fields' => 
				array (
					0 => 
					array (
						'key' => 'field_507cdb310c52b',
						'label' => 'Facebook',
						'name' => 'facebook',
						'type' => 'text',
						'instructions' => '',
						'column_width' => '',
						'default_value' => '',
						'formatting' => 'none',
						'order_no' => '0',
					),
					1 => 
					array (
						'key' => 'field_507cdb310c912',
						'label' => 'Twitter',
						'name' => 'twitter',
						'type' => 'text',
						'instructions' => '',
						'column_width' => '',
						'default_value' => '',
						'formatting' => 'none',
						'order_no' => '1',
					),
					2 => 
					array (
						'key' => 'field_507cdb310ccfa',
						'label' => 'YouTube',
						'name' => 'youtube',
						'type' => 'text',
						'instructions' => '',
						'column_width' => '',
						'default_value' => '',
						'formatting' => 'none',
						'order_no' => '2',
					),
					3 => 
					array (
						'key' => 'field_507cdb310d15f',
						'label' => 'Instagram',
						'name' => 'instagram',
						'type' => 'text',
						'instructions' => '',
						'column_width' => '',
						'default_value' => '',
						'formatting' => 'none',
						'order_no' => '3',
					),
				),
				'row_min' => '1',
				'row_limit' => '1',
				'layout' => 'row',
				'button_label' => '',
				'order_no' => '0',
			),
			1 => 
			array (
				'key' => 'field_507cdbb5e2288',
				'label' => 'Sliders Options',
				'name' => 'sliders_options',
				'type' => 'repeater',
				'instructions' => '',
				'required' => '0',
				'sub_fields' => 
				array (
					0 => 
					array (
						'choices' => 
						array (
							'fade' => 'Fade',
							'scrollLeft' => 'Scroll Left',
							'scrollRight' => 'Scroll Right',
							'scrollUp' => 'Scroll Up',
							'scrollDown' => 'Scroll Down',
							'scrollHorz' => 'Scroll Horizontal',
						),
						'key' => 'field_507cde774def7',
						'label' => 'Featured',
						'name' => 'featured',
						'type' => 'select',
						'instructions' => '',
						'column_width' => '',
						'default_value' => 'scrollHorz',
						'allow_null' => '0',
						'multiple' => '0',
						'order_no' => '0',
					),
					1 => 
					array (
						'choices' => 
						array (
							'fade' => 'Fade',
							'scrollLeft' => 'Scroll Left',
							'scrollRight' => 'Scroll Right',
							'scrollUp' => 'Scroll Up',
							'scrollDown' => 'Scroll Down',
							'scrollHorz' => 'Scroll Horizontal',
						),
						'key' => 'field_507cdeec606c5',
						'label' => 'Explore',
						'name' => 'explore',
						'type' => 'select',
						'instructions' => '',
						'column_width' => '',
						'default_value' => 'scrollHorz',
						'allow_null' => '0',
						'multiple' => '0',
						'order_no' => '1',
					),
					2 => 
					array (
						'choices' => 
						array (
							'fade' => 'Fade',
							'scrollLeft' => 'Scroll Left',
							'scrollRight' => 'Scroll Right',
							'scrollUp' => 'Scroll Up',
							'scrollDown' => 'Scroll Down',
							'scrollHorz' => 'Scroll Horizontal',
						),
						'key' => 'field_507cdeec60aaa',
						'label' => 'Freshly Baked',
						'name' => 'freshly_baked',
						'type' => 'select',
						'instructions' => '',
						'column_width' => '',
						'default_value' => 'fade',
						'allow_null' => '0',
						'multiple' => '0',
						'order_no' => '2',
					),
				),
				'row_min' => '1',
				'row_limit' => '1',
				'layout' => 'row',
				'button_label' => '',
				'order_no' => '1',
			),
		),
		'location' => 
		array (
			'rules' => 
			array (
				0 => 
				array (
					'param' => 'options_page',
					'operator' => '==',
					'value' => 'Options',
					'order_no' => '0',
				),
			),
			'allorany' => 'all',
		),
		'options' => 
		array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => 
			array (
			),
		),
		'menu_order' => 0,
	));
}

// Default WordPress pagination tweaked to use page numbers
function bootstrap_pagination(){
	global $wp_query;
	$total_pages = $wp_query->max_num_pages;
	if ($total_pages > 1){
	  $current_page = max(1, get_query_var('paged'));
	  echo '<div class="pagination">';
	  echo paginate_links(array(
	      'base' => get_pagenum_link(1) . '%_%',
	      'format' => 'page/%#%',
	      'current' => $current_page,
	      'total' => $total_pages,
	      'prev_text' => 'Prev',
	      'next_text' => 'Next',
		  'type' => 'list'
	    ));
	  echo '</div>';
	}
}


?>