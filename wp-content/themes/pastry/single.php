<?php get_header(); ?>

<section id="page-content" class="top">
	<h1 class="page-title">Sweet Talk Blog...</h1>
	<div class="blog-landing">	
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="date-of-post">
				<?php the_time('F j, Y'); ?>
			</div>
			
			<div class="entry-content">
				<h1 class="post-title"><?php the_title(); ?></h1>
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
		
		<?php endwhile; endif; ?>
		<?php comments_template( '', true ); ?>
	</div><!-- .blog-landing -->
<?php get_sidebar(); ?>
</section><!-- #page -->
<?php get_footer(); ?>


