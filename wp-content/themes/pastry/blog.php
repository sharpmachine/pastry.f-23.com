<?php 
/*
	Template Name: Blog
*/
get_header(); ?>

				<section id="page-content" class="top">

					<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<?php if ( is_front_page() ) { ?>
						<h2 class="entry-title"><?php the_title(); ?></h2>
					<?php } else { ?>
						<h1 class="entry-title page-title"><?php the_title(); ?></h1>
					<?php } ?>

					<div class="entry-content">
						<?php the_content(); ?>
						<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'smm' ), 'after' => '</div>' ) ); ?>
					</div><!-- .entry-content -->
				</div><!-- #post-## -->

<?php endwhile; // end of the loop. ?>
					<?php rewind_posts(); ?>
					
					<?php query_posts("cat=-0"); ?>
						<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
							<?php the_time('F j, Y'); ?>
							<h1><?php the_title(); ?></h1>
							<?php the_content(); ?>
							<?php comments_number(); ?>
							<a href="<?php comments_link(); ?>">Leave a Comment</a> 
							<?php endwhile; ?>
							<!-- post navigation -->
							<?php else: ?>
							<!-- no posts found -->
							<?php endif; ?>	
		
				</section><!-- #page -->

<?php get_footer(); ?>