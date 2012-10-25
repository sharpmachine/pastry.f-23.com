<?php
/*
	Template Name: Homepage
*/
get_header(); ?>
	
		<section class="top" id="slideshow">
			<div class="cycle-container">
			<div class="cycle-pager"></div>
				<ul class="cycle">
<?php while(the_repeater_field('featured_slides')): ?>			
					<li><a href="<?php the_sub_field('featured_link'); ?>"><img src="<?php the_sub_field('featured_preview'); ?>" alt=""></a></li>
<?php endwhile; ?>
				</ul>
			</div>		
		</section><!-- #slideshow -->
		
		<section id="instagram-carousel">
			<div class="prev-next">
				<span class="prev"><a href="javascript:void(0)">Prev</a></span>
				<span class="next"><a href="javascript:void(0)">Next</a></span>
			</div>	
			<div class="grams">

			<?php
			 	$rss = new DOMDocument();
			 	$rss->load('http://followgram.me/lovepastry/rss');
			 	$feed = array();
				
				foreach ($rss->getElementsByTagName('item') as $node) {
					array_push($feed, $node->getElementsByTagName('description')->item(0)->nodeValue);
				}

				$i = 0;
				$display_count = 18;

				$imgpattern = '/src="(.*?)"/i';
				for($x = 0; $x < $display_count; $x++) {
					//foreach ($feed as $link_code) {
					if( $i == 0 ) {
						echo '<ul class="cycle nostyle">';
					}
					$link_code = $feed[$x];
					preg_match($imgpattern, $link_code, $links);
					echo '<li><a href="'.$links[1].'" rel="lightbox"><img src="'.$links[1].'"/></a></li>';					
					if( $i == 5 ) {
						echo '</ul>';
						$i = 0;

					}
					else {
						$i++;
					}

				}	
			?>
			</div>
		</section><!-- #instagram-carousel -->
		
		<section class="block">
			<div id="explore" class="main">
			<h2 class="sec-title">Explore</h2>
				<div class="tabs">
					<ul class="tab-menu">
						<li><a href="#by-artists">By Artists</a></li>
						<li class="mid"><a href="#by-video">By Video</a></li>
						<li><a href="#by-music">By Music</a></li>
					</ul>
					<div id="by-artists" class="tab">
						<div class="explore-posts">	
							

<?php $query = new WP_Query('category_name=song&tag=Artists'); ?>
<?php if ($query->have_posts()) :
	$i=0; // counter
	while ($query->have_posts()) : $query->the_post();
		if($i%3==0) { ?>
		<ul class="cycle notsyle">
		<?php } ?>
								<li class="post-type song">
									<div class="post-thumb"><img src="<?php $image_id = get_post_thumbnail_id(); $image_url = wp_get_attachment_image_src($image_id, true); echo $image_url[0]; ?>" alt="<?php the_title(); ?>"></div>
									<div class="excerpt-post">
										<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
										<p><?php $excerpt = get_the_excerpt(); echo string_limit_words($excerpt,14); ?>...</p>
										<span class="post-views"><?php the_views(); ?></span>
									</div>
								</li>
		<?php $i++;
		if($i%3==0) { ?>
		</ul>
		<?php } ?>

	<?php endwhile; ?>
		<?php
		if($i%3!=0) { ?>
		</ul>
		<?php } ?>

<?php endif; 
	wp_reset_query();
?>
																	
						</div>
						<div class="prev-next">
							<span class="prev"><a href="javascript:void(0)">Prev</a></span>
							<span class="next"><a href="javascript:void(0)">Next</a></span>
						</div>	
					</div>
					<div id="by-video" class="tab">

						<div class="explore-posts">	
							

<?php $query = new WP_Query('category_name=song&tag=Video'); ?>
<?php if ($query->have_posts()) :
	$i=0; // counter
	while ($query->have_posts()) : $query->the_post();
		if($i%3==0) { ?>
		<ul class="cycle notsyle">
		<?php } ?>
								<li class="post-type song">
									<div class="post-thumb"><img src="<?php $image_id = get_post_thumbnail_id(); $image_url = wp_get_attachment_image_src($image_id, true); echo $image_url[0]; ?>" alt="<?php the_title(); ?>"></div>
									<div class="excerpt-post">
										<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
										<p><?php $excerpt = get_the_excerpt(); echo string_limit_words($excerpt,14); ?>...</p>
										<span class="post-views"><?php the_views(); ?></span>
									</div>
								</li>
		<?php $i++;
		if($i%3==0) { ?>
		</ul>
		<?php } ?>

	<?php endwhile; ?>
		<?php
		if($i%3!=0) { ?>
		</ul>
		<?php } ?>

<?php endif; 
	wp_reset_query();
?>
																	
						</div>
						<div class="prev-next">
							<span class="prev"><a href="javascript:void(0)">Prev</a></span>
							<span class="next"><a href="javascript:void(0)">Next</a></span>
						</div>
	
					</div>
					<div id="by-music" class="tab">

						<div class="explore-posts">	
							

<?php $query = new WP_Query('category_name=song&tag=Music'); ?>
<?php if ($query->have_posts()) :
	$i=0; // counter
	while ($query->have_posts()) : $query->the_post();
		if($i%3==0) { ?>
		<ul class="cycle notsyle">
		<?php } ?>
								<li class="post-type song">
									<div class="post-thumb"><img src="<?php $image_id = get_post_thumbnail_id(); $image_url = wp_get_attachment_image_src($image_id, true); echo $image_url[0]; ?>" alt="<?php the_title(); ?>"></div>
									<div class="excerpt-post">
										<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
										<p><?php $excerpt = get_the_excerpt(); echo string_limit_words($excerpt,14); ?>...</p>
										<span class="post-views"><?php the_views(); ?></span>
									</div>
								</li>
		<?php $i++;
		if($i%3==0) { ?>
		</ul>
		<?php } ?>

	<?php endwhile; ?>
		<?php
		if($i%3!=0) { ?>
		</ul>
		<?php } ?>

<?php endif; 
	wp_reset_query();
?>


																	
						</div>
						<div class="prev-next">
							<span class="prev"><a href="javascript:void(0)">Prev</a></span>
							<span class="next"><a href="javascript:void(0)">Next</a></span>
						</div>
	
					</div>
				</div>
			</div><!-- #explore -->
			
			<div id="freshly-team" class="aside">
				<div class="spacer"></div>
				<div class="tabs">
					<ul class="tab-menu">
						<li><a href="#freshly-baked">Freshly Baked</a></li>
						<li class="mid"><a href="#team-supply">Team Supply</a></li>
					</ul>
					
 					
					<div id="freshly-baked" class="tab">
						<div class="cycle-container">
							<div class="cycle-pager"></div>
							<ul class="cycle">
								<?php while(has_sub_field('freshly_baked')): ?>			
								<li>
									<a href="<?php the_sub_field('fb_link'); ?>">
										<img src="<?php the_sub_field('fb_preview'); ?>" alt="">
									</a>
								</li>								
								<?php endwhile; ?>
							</ul>
						</div>
					</div>
					
					<div id="team-supply" class="tab">
						<div class="cycle-container">
							<!-- <div class="cycle-pager"></div> -->							
							<ul class="cycle">
								<?php while(has_sub_field('team_supply')): ?>			
								<li>
									<a href="<?php the_sub_field('ts_link'); ?>">
										<img src="<?php the_sub_field('ts_preview'); ?>" alt="">
									</a>
								</li>
								<?php break; ?>
								<?php endwhile; ?>
							</ul>
						</div>
					</div>
					
				</div><!-- #tabs -->
			</div><!-- #freshly-team -->
		</section>

		<section class="block">
			<div id="were-social" class="main">
			<h2 class="sec-title">We're Social</h2>			
				<div class="tabs">
					<ul class="tab-menu">
						<li><a href="#all">All</a></li>
						<li class="mid"><a href="#facebook">Facebook</a></li>
						<li><a href="#twitter">Twitter</a></li>
					</ul>
					<div id="all" class="tab"></div>
					<div id="facebook" class="tab"></div>
					<div id="twitter" class="tab"></div>
				</div>
			</div>
			
			<div id="fresh-out" class="aside">
				<h2 class="sec-title">Fresh out of oven</h2>
				<ul class="fresh-posts nostyle">
					<?php
					global $post;
					$posts = get_field('fresh_out_of_oven');
					if( $posts ): ?>
					<?php foreach( $posts as $post): setup_postdata($post); ?>
					<li class="post-type <?php $category = get_the_category(); echo $category[0]->slug; ?>">
						<div class="excerpt-post">
							<span class="post-date">__<?php echo get_the_time(get_option('date_format')); ?></span>
							<h2><a href="<?php the_permalink(); ?>"><?php the_title();  ?></a></h2>
							<p><?php $excerpt = get_the_excerpt(); echo string_limit_words($excerpt,14); ?>...</p>
						</div>
					</li>
					<?php endforeach; ?>
					<?php wp_reset_postdata();
					endif; ?>
				</ul>
			</div><!-- #fresh-out -->
		</section>
		
<?php get_footer(); ?>