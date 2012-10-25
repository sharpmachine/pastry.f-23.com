<section id="sidebar">
	<div id="fresh-out" class="sb">
		<h2 class="sec-title">Fresh out of oven</h2>
		<ul class="fresh-posts nostyle">
		<?php query_posts("cat=-5&posts_per_page=2"); ?>
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			
			<li class="post-type <?php $category = get_the_category(); echo $category[0]->slug; ?>">
				<div class="excerpt-post">
					<span class="post-date">__<?php echo get_the_time(get_option('date_format')); ?></span>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title();  ?></a></h2>
					<p><?php $excerpt = get_the_excerpt(); echo string_limit_words($excerpt,14); ?>...</p>
				</div>
			</li>			
			
			<?php endwhile; endif; ?>
		</ul>
	</div><!-- #fresh-out -->
	
	<?php
					/* When we call the dynamic_sidebar() function, it'll spit out
		 			* the widgets for that widget area. If it instead returns false,
		 			* then the sidebar simply doesn't exist, so we'll hard-code in
		 			* some default sidebar stuff just in case.
		 			*/
				if ( ! dynamic_sidebar( 'primary-widget-area' ) ) : ?>
	
	
					<?php endif; // end primary widget area ?>
					
					
</section>
<div style="clear:both;"></div>