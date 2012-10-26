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
				<h1 class="post-title"><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</div>
		
			<?php comments_number('0 Comments'); ?>
			<a href="<?php comments_link(); ?>">Leave a Comment</a> 
		</article><!-- #post -->
		
		<?php endwhile; ?>
		
		<?php bootstrap_pagination(); ?>

		<?php $wp_query = null; $wp_query = $temp;?>

	</div><!-- .blog-landing -->
<?php get_sidebar(); ?>
</section><!-- #page -->
<?php get_footer(); ?>