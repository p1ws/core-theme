<?php get_header(); ?>

			<section id="header--page" class="container--slim"> 
				<div id="header--page__content" >
					<?php if ( function_exists('yoast_breadcrumb') ) 
						{yoast_breadcrumb('<p id="breadcrumbs">','</p>');} ?>
				</div>
			</section><!--- end of #header--page --->

			<main>				
				<div id="main__container" class="container--slim">

					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

						<article id="post-<?php the_ID(); ?>" class="post-block flexrow">			
							
							<div class="post-block__content xs--1 md--3of4">
								
								<article id="post-<?php the_ID(); ?>" class="main--article">
									<h1 class="main--article__title">
										<?php 
											$seotitle = get_field( 'seo_h1_title' );
											if ($seotitle) {
												echo the_field('seo_h1_title');
											}
											else {
												echo the_title(); 
											} 
										?>
									</h1>
								</article>								
							
								<header class="article-header">
									<p class="article-date"><?php the_time('F jS, Y'); ?> <!-- | <?php // the_author_posts_link(); ?> --></p>
								</header>

							<!-- <section class="entry-content"> -->
								
								<section class="main--article__content">
									
									<div class="post-block__image xs--1 md--1">
										<?php if ( has_post_thumbnail() ) {
											the_post_thumbnail('full');
										} else { ?>
											<img src="<?php bloginfo('template_directory'); ?>/library/images/blog-placeholder.jpg" alt="<?php the_title(); ?>" />
										<?php } ?>
									</div>
								
									<?php the_content(); ?>
							
								</section>

								<footer class="article-footer">

								</footer>
							
							</div>
							
							<div class="xs--1 md--1of4">
								<?php get_sidebar(); ?>
							</div>

						</article>

						<?php endwhile; ?>

							<?php p1ws_page_navi(); ?>

						<?php else : ?>

							<article id="post-not-found" class="hentry">
								<header class="article-header">
									<h1><?php _e( 'Oops, Post Not Found!', 'p1wscore' ); ?></h1>
								</header>
								<section class="entry-content">
									<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'p1wscore' ); ?></p>
								</section>
								<footer class="article-footer">	
									<p><?php _e( 'This is the error message in the index.php template.', 'p1wscore' ); ?></p>
								</footer>
							</article>

						<?php endif; ?><!-- #main--article -->
					
					</div><!-- end of #main__container -->
				
				</main><!-- end of main -->

<?php get_footer(); ?>
