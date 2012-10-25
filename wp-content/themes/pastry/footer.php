</div><!-- #wrap -->
	<footer>
		<div id="recently-viewed" class="widget"></div>
		
		<div id="newsletter" class="widget">
		<h3>Newsletter</h3>
		<p>Exclusive offer when you sign up</p>
		<form>
			<input type="text" placeholder="Your email address"><input type="submit" value="Submit">
		</form>
		</div><!-- #newsletter -->
		
		<div id="stay-connected" class="widget">
		<h3>Stay Connected</h3>
		<p>on mobile, Facebook, Twitter and YouTube.</p>
		
		<?php the_repeater_field('social_links', 'options'); ?>
		<p><a target="_blank" href="http://facebook.com/<?php echo get_sub_field('facebook')?>" class="facebook" title="Like <?php bloginfo('name'); ?> on Facebook">Facebook</a> <a target="_blank" href="http://twitter.com/<?php echo get_sub_field('twitter')?>" class="twitter" title="Follow <?php bloginfo('name'); ?> on Twitter">Twitter</a> <a target="_blank" href="http://followgram.me/<?php echo get_sub_field('instagram')?>" class="instagram" title="Subscribe <?php bloginfo('name'); ?> on Instagram">Instagram</a> <a target="_blank" href="http://youtube.com/user/<?php echo get_sub_field('youtube')?>" class="youtube" title="Subscribe <?php bloginfo('name'); ?> on YouTube">YouTube</a></p>
		</div><!-- #stay-connected -->
		
		<div class="clear"></div>
		<nav>
			<ul>
				<li><a href="<?php bloginfo('url'); ?>/about">About</a></li>
				<li><a href="">FAQ</a></li>
				<li><a href="">Contact Us</a></li>
				<li><a href="">Wholesale</a></li>
				<li><a href="">Terms of Use</a></li>
				<li><a href="">Careers</a></li>
				<li><a href="">Reruen Policy</a></li>
				<li><a href="">International Shipping</a></li>
			</ul>
		</nav>
		<p class="note">&copy; 2012 LovePastry. All Rights Reserved.</p>
	</footer>
	

	
<?php wp_footer(); ?>

</body>
</html>