<?php get_header(); ?>

			<main class="container--slim">			

				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
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

						<!-- Page Content -->
						<section class="main--article__content">
							<?php the_content(); ?>
						</section> <!-- end page-content -->

					<?php endwhile; else : ?>
						<article id="post-not-found" class="">
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
			
			</main> <!--- end of main --->

<?php get_footer(); ?>
