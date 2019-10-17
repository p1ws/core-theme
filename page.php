<?php get_header(); ?>

			<main class="container--slim">	
				<?php if ( function_exists('yoast_breadcrumb') ) 
					{yoast_breadcrumb('<p id="breadcrumbs">','</p>');} ?>			
				
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

						<!-- Include / Flexible Layout -->
						<?php if( have_rows('container') ): ?>
							<section id="flexible-layout">
								<?php include('includes/flexible-layout.php'); ?>
							</section>
						<?php endif; ?>	 <!--- end include/flexible-layout --->			

						<!-- Additional Content Area  -->
						<section id="additional-content">
							<?php the_field('additional-content'); ?>
						</section>						


					</article><!-- end of article -->

				
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
				
				

						<!-- Include / Content Grid  -->
						<?php if( have_rows('content-grid') ): ?>
							<section id="main--content-grid">
								<?php include('includes/content-grid.php'); ?>
							</section>
						<?php endif; ?> <!-- end include/content-grid -->
					

				
			</main> <!--- end of main --->

<?php get_footer(); ?>
