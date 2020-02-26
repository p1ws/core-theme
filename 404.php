<?php get_header(); ?>

			<section id="header--page" class="container--slim">
				<div id="header--page__content">
					<?php if ( function_exists('yoast_breadcrumb') ) 
						{yoast_breadcrumb('<p id="breadcrumbs">','</p>');} ?>
				</div>
			</section>  <!--- end of #header--page --->

			<main>							
		                <article id="post-<?php the_ID(); ?>" class="main--article container--slim">
					<h1 class="main--article__title">Page Not Found</h1>								
					<section class="main--article__content">
						<?php if( have_rows('company_phone', 'options') ): ?>
							<?php while( have_rows('company_phone', 'options') ): the_row(); ?>
       		                   				<h2>Sorry, we couldn't find what you were looking for.</h2>
               		           				<p>Try again by using the search bar, by visiting the <a href="/sitemap/">sitemap</a>, or by going to our <a href="/">homepage</a>.</p>
								<p>If you are still having trouble, contact the experts at <?php bloginfo( 'name' ); ?> by calling <a href=" <?php echo get_sub_field('company-phone_link', 'options'); ?>" title="Call <?php bloginfo( 'name' ); ?>"><?php echo get_sub_field('company-phone', 'options'); ?></a> or by filling out our <a href="/contact/">contact form</a> for further assistance.</p>
							<?php endwhile; ?>
						<?php endif; ?>
					</section>
					<section class="main--article__search">
						<p><?php get_search_form(); ?></p>
					</section>
				</article>

			</main> <!--- end of main --->

<?php get_footer(); ?>
