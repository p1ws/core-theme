<?php get_header(); ?>

			<section id="header--page" class="container--slim"> 				
				<div id="header--page__content">
					<?php if ( function_exists('yoast_breadcrumb') ) 
						{yoast_breadcrumb('<p id="breadcrumbs">','</p>');} ?>
				</div>														
			</section>  <!--- end of #header--page --->

			<main>				
				<div id="main__container" class="container--slim">
					
					<div class="xs--1 md--3of4">
					
						<article id="post-<?php the_ID(); ?>" class="main--article">
							<h1 class="main--article__title">PortMA Blog</h1>		
						</article>

						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
						<article id="post-<?php the_ID(); ?>" class="post-block flexrow"> <!-- .vertical -->
						 
							<div class="post-block__image xs--1 md--1of3">
								<?php if ( has_post_thumbnail() ) { 
									$featured_img_url = get_the_post_thumbnail_url($post->ID, 'full'); 
									?>
									<img alt="<?php the_title(); ?>" src="<?php echo $featured_img_url; ?>" />								
								<?php
									} else { ?>
									<img src="<?php bloginfo('template_directory'); ?>/library/images/blog-placeholder.jpg" alt="<?php the_title(); ?>" />
								<?php } ?>	
							</div>

							<div class="post-block__content xs--1 md--2of3">
								<h4 id="post-block__title">
									<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">
										<?php the_title(); ?>
									</a>
								</h4>		

								<section class="main--article__content">
									<?php the_excerpt(); ?>
								</section>

								<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">Read More &#187;</a>
								
							</div>
							
							<hr class="divider" />
						
						</article>

						<?php endwhile; ?>
							<?php p1ws_page_navi(); ?>
						<?php else : ?>
					
					<article id="post-not-found" class="container--slim">
						<header class="article-header">
							<h1><?php _e( 'Oops, Post Not Found!', 'p1wscore' ); ?></h1>
						</header>
						<section class="entry-content">
							<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'p1wscore' ); ?></p>
						</section>
						<footer class="article-footer">	
							<p><?php _e( 'This is the error message in the page-custom.php template.', 'p1wscore' ); ?></p>
						</footer>
					</article>

					<?php endif; ?> <!--- #main--article --->
						
				</div>
					
				<div class="xs--1 md--1of4">
					<?php get_sidebar(); ?>
				</div>
					
			</div>  <!--- end of #main__container --->
				
		</main> <!--- end of main --->

<?php get_footer(); ?>
