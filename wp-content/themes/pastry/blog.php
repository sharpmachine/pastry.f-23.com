<?php 
/*
	Template Name: Blog
*/
get_header(); ?>

<section id="page-content" class="top">
	<h1 class="page-title"><?php the_title(); ?></h1>
	<div class="blog-landing">	
		<?php
			$temp = $wp_query;
			$wp_query= null;
			$wp_query = new WP_Query();
			$wp_query->query('posts_per_page=5'.'&paged='.$paged);
			while ($wp_query->have_posts()) : $wp_query->the_post();
		?>
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
		
		<?php endwhile; ?>
		
		<?php bootstrap_pagination(); ?>

		<?php $wp_query = null; $wp_query = $temp;?>

	</div><!-- .blog-landing -->
<?php get_sidebar(); ?>
</section><!-- #page -->
<?php get_footer(); ?>