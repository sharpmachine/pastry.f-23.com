<?php get_header(); ?>

<section id="page-content" class="top">
	<h1 class="page-title"><?php printf( __( 'Results for: %s', 'smm' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
	<div class="blog-landing">	
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			
			
<div class="blog-landing">	

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="date-of-post">
				<?php the_time('F j, Y'); ?>
			</div>
			
			<div class="entry-content">
				<h1 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
				<?php the_content(); ?>
			</div>
			<div class="comment-system">
				<div class="commenting">
					<?php comments_number('<div class="comment-count"><span>0</span></div> Comments', '<div class="comment-count"><span>1</span></div> Comment', '<div class="comment-count"><span>%</span></div> Comments' ); ?>
				</div>
				<div class="leaving-comment">
					<a href="<?php comments_link(); ?>" class="leave-comment"><span></span>Leave a Comment!</a>
				</div>
				<div class="share-this">
					<span>Share this:</span>
					<a href="http://www.facebook.com/sharer.php?u=<?php the_permalink() ?>"><img src="<?php bloginfo('template_directory') ?>/assets/img/share-facebook.png"></a>
					<a href="http://twitter.com/share?text=<?php the_title() ?>&url=<?php the_permalink() ?>"><img src="<?php bloginfo('template_directory') ?>/assets/img/share-twitter.png"></a>
				</div>
			</div>
		</article><!-- #post -->

</div>	


<?php endwhile; else : ?>
			<div id="post-0" class="post no-results not-found">
				<h2 class="entry-title"><?php _e( 'Nothing Found', 'smm' ); ?></h2>
				<div class="entry-content">
					<p><?php _e( 'Sorry, but nothing matched your search criteria. Please try again with some different keywords.', 'smm' ); ?></p>
					<?php get_search_form(); ?>
				</div><!-- .entry-content -->
			</div><!-- #post-0 -->
<?php endif; ?>

	
</div>
<?php get_sidebar(); ?>
</section><!-- #page -->
<?php get_footer(); ?>