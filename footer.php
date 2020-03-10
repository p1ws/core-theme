				<footer id="footer--global" role="contentinfo" class="container--full">

					<!-- FOOTER TOP -->
					<section id="footer--global__top" class="container--full flexrow xs--around md--between"> 
						<!-- Logo -->
						<a id="logo--footer" title="<?php bloginfo( 'name' ); ?>" href="<?php echo home_url(); ?>" class="xs--1 xs--align-center md--1of2 md--align-left">
							<img src="<?php echo get_field('logo', 'options'); ?>" alt="<?php echo get_field('company_name', 'options'); ?>" />
						</a>
						<!-- GLOBAL LINKS -->
						<div id="footer--global__links" class="xs--1 xs--align-center md--1of2 md--align-right">
							<?php include(get_template_directory().'/includes/global-links.php'); ?>
						</div>					
					</section>

					<!-- FOOTER MAIN -->
					<section id="footer--global__main" class="container--full">
						<nav role="navigation" class="flexrow xs--start md--between">
							<?php wp_nav_menu(array(
								'container' => 'div',                           // enter '' to remove nav container (just make sure .footer-links in _base.scss isn't wrapping)
								'container_class' => 'footer-links',         // class of container (should you choose to use it)
								'menu' => __( 'Footer Links', 'p1wscore' ),   // nav name
								'menu_class' => 'nav footer-nav flexrow wrap xs--between',            // adding custom nav class
								'theme_location' => 'footer-links',             // where it's located in the theme
								'before' => '',                                 // before the menu
								'after' => '',                                  // after the menu 
								'link_before' => '',                            // before each link
								'link_after' => '',                             // after each link
								'depth' => 0,                                   // limit the depth of the nav
								'fallback_cb' => 'p1ws_footer_links_fallback'  // fallback function
							)); ?>

							<?php if( have_rows('global-footer_additional-content', 'options') ): ?>
								<div id="nav__additional-content" class="xs--1 md--1of4 flexrow xs--column xs--between">															

									<?php while( have_rows('global-footer_additional-content', 'options') ): the_row(); ?>
										<div class="additional-content flexrow xs--1of2 md--1 xs--start md--end">
											<div class="xs--1 xs--align-center md--1of2 md--align-right">
												<img alt="<?php bloginfo( 'name' ); ?>" src="<?php the_sub_field('additional-content_image', 'options'); ?>" />
											</div>
											<div class="xs--align-center md--1of2 md--align-left">
												<span><?php the_sub_field('additional-content_text', 'options'); ?></span>
											</div>	
										</div>		
									<?php endwhile; ?>	

									<?php if( have_rows('partners', 'options') ): ?>								
										<?php while( have_rows('partners', 'options') ): the_row(); ?>
											<div id="partner-logos">										
												<a title="<?php the_sub_field('partner_name', 'options'); ?>" href="<?php the_sub_field('partner_link', 'options'); ?>" class="xs--1 xs--align-center md--align-right">
													<img src="<?php echo get_sub_field('partner_logo', 'options'); ?>" alt="<?php the_sub_field('partner_name', 'options'); ?>" />
												</a>																				
											</div>	
										<?php endwhile; ?>			
									<?php endif; ?>										

								</div>			
							<?php endif; ?>		

						</nav>
					</section>

					<!-- FOOTER SUB -->
					<section id="footer--global__sub" class="container--full flexrow xs--around md--between">
							<!-- SOCIAL -->
							<?php if( have_rows('global_social','options') ): ?>
								<div id="footer--sub__social" class="xs--1 xs--align-center">
									<ul>
										<?php while( have_rows('global_social','options') ): the_row(); ?>
											<li>
												<a href="<?php echo get_sub_field('social_link','options'); ?>" title="<?php echo get_sub_field('social_text','options'); ?>">
													<?php echo get_sub_field('social_icon','options'); ?>
												</a>
											</li>
										<?php endwhile; ?>
									</ul>
								</div>
							<?php endif; ?>
							<!-- COPYRIGHT & LINKS -->
							<div id="footer--sub__copyright" class="xs--1 xs--align-center md--1of2 md--align-left">
								<p class="source-org copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?> All rights reserved.</p>

								<?php if( have_rows('global-footer_links','options') ): ?>
									<ul>
										<?php while( have_rows('global-footer_links','options') ): the_row(); ?>
											<li>
												<a href="<?php echo get_sub_field('footer-link_link','options'); ?>" title="<?php echo get_sub_field('footer-link_text','options'); ?>">
													<?php echo get_sub_field('footer-link_text','options'); ?>
												</a>
											</li>
										<?php endwhile; ?>
									</ul>
								<?php endif; ?>
							</div>
							<!-- OTHER INFO -->
							<div id="footer--sub__links" class="xs--1 xs--align-center md--1of2 md--align-right">

								<?php if( have_rows('company_address','options') ): ?>
									<ul>
										<?php while( have_rows('company_address','options') ): the_row(); ?>
											<li>
												<a href="<?php echo get_sub_field('company-address_link','options'); ?>" title="<?php echo get_sub_field('company-address_text','options'); ?>">
													<?php echo get_sub_field('company-address_text','options'); ?>
												</a>
											</li>
										<?php endwhile; ?>
									</ul>
								<?php endif; ?>

								<?php if( have_rows('global-footer_credit','options') ): ?>
										<?php while( have_rows('global-footer_credit','options') ): the_row(); ?>
											<p>
												<?php echo get_sub_field('credit_text','options'); ?> <img src="<?php echo get_sub_field('credit_image','options'); ?>" alt="<?php echo get_sub_field('credit_text','options'); ?>" />
											</p>
										<?php endwhile; ?>
								<?php endif; ?>							
							</div>
					</section>
				</footer>

			</div> <!-- end of #site__content -->
		</div> <!-- end of #site__container -->

		<?php // all js scripts are loaded in library/core.php ?>
		<?php wp_footer(); ?>

		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/library/slick/slick.min.js"></script>

	</body>

	<!-- Additional Scripts -->
	<?php echo get_field('scripts_footer', 'options'); ?>

</html>
