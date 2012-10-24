<?php get_header(); ?>

<section id="page-content" class="top">

	<h1 class="page-title"><?php the_title(); ?></h1>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<?php the_content(); ?>
	<?php endwhile; ?>
	<!-- post navigation -->
	<?php else: ?>
	<!-- no posts found -->
	<?php endif; ?>
</section>
<?php get_footer(); ?>
