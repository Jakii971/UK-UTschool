



<?php $__env->startSection('content'); ?>

	<style>
		.carousel-item img {
        height: 300px !important;
        object-fit: cover;
    }
    .carousel {
        width: 98.9vw;
    }
		
		.animated-button {
				position: relative;
				display: flex;
				align-items: center;
				gap: 4px;
				padding: 7px 27px;
				border: 4px solid;
				border-color: transparent;
				font-size: 16px;
				background-color: inherit;
				border-radius: 100px;
				font-weight: 600;
				color: #0D6EFD;
				box-shadow: 0 0 0 2px #0D6EFD;
				cursor: pointer;
				overflow: hidden;
				transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		}

			.animated-button svg {
				position: absolute;
				width: 24px;
				fill: #0D6EFD;
				z-index: 9;
				transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
		}

			.animated-button .arr-1 {
				right: 16px;
			}

			.animated-button .arr-2 {
				left: -25%;
			}

			.animated-button .circle {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 20px;
				height: 20px;
				background-color: #0D6EFD;
				border-radius: 50%;
				opacity: 0;
				transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
			}

			.animated-button .text {
				position: relative;
				z-index: 1;
				transform: translateX(-12px);
				transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
			}

			.animated-button:hover {
				box-shadow: 0 0 0 12px transparent;
				color: #fafafa;
				border-radius: 12px;
			}

			.animated-button:hover .arr-1 {
				right: -25%;
			}

			.animated-button:hover .arr-2 {
				left: 16px;
			}

			.animated-button:hover .text {
				transform: translateX(12px);
			}

			.animated-button:hover svg {
				fill: #fafafa;
			}

			.animated-button:active {
				scale: 0.95;
				box-shadow: 0 0 0 4px #0D6EFD;
			}

			.animated-button:hover .circle {
				width: 220px;
				height: 220px;
				opacity: 1;
			}

	</style>

	<main>
		<!--* Corousel -->
		<div
			id="carouselExampleInterval"
			class="carousel slide"
			data-bs-ride="carousel"
		>
			<div class="carousel-inner">
				<div class="carousel-item active" data-bs-interval="2000">
					<img
						src="<?php echo e(asset('images/korosel1.jpg')); ?>"
						class="d-block w-100"
						alt="..."
						style=""
					/>
				</div>
				<div class="carousel-item" data-bs-interval="2000">
					<img
						src="<?php echo e(asset('images/korosel2.jpg')); ?>"
						class="d-block w-100"
						alt="..."
						style=""
					/>
				</div>
				<div class="carousel-item" data-bs-interval="2000">
					<img
						src="<?php echo e(asset('images/korosel3.jpg')); ?>"
						class="d-block w-100"
						alt="..."
						style=""
					/>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				data-bs-target="#carouselExampleInterval"
				data-bs-slide="prev"
			>
				<span
					class="carousel-control-prev-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleInterval"
				data-bs-slide="next"
			>
				<span
					class="carousel-control-next-icon"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>
		<!--* Corousel END-->
	</main>

	<section class="">
		<div class="container py-4 px-5">
			<div class="h1 text-center text-dark" id="pageHeaderTitle">Kota Destinasi Wisata</div>

			<?php $__currentLoopData = $kategoris; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $kategori): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
			<article class="postcard light blue">
				<a class="postcard__img_link" href="#">
					
					<img class="postcard__img" src="http://127.0.0.1:5000<?php echo e($kategori->image); ?>" alt="Image Title" />
				</a>
				<div class="postcard__text t-dark">
					<h1 class="postcard__title blue"><a href="#"><?php echo e($kategori->nama_kategori); ?></a></h1>
					<div class="postcard__bar"></div>
					<div class="postcard__preview-txt"><?php echo e($kategori->deskripsi); ?></div>
					<ul class="postcard__tagbox">
						<a href="/subkategori/<?php echo e($kategori->id); ?>">
							<button class="animated-button">
								<svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
									></path>
								</svg>
								<span class="text">Lihat Tempat wisata</span>
								<span class="circle"></span>
								<svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
									></path>
								</svg>
							</button>
						</a>
					</ul>
				</div>
			</article>
			<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
		</div>
		<script src="https://kit.fontawesome.com/c0ad9aaa27.js" crossorigin="anonymous"></script>
	</section>
<?php $__env->stopSection(); ?>

				
			





<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\uts\JAKI\UT School\uji_kompetensi\client\larapelUK\resources\views/kategori/index.blade.php ENDPATH**/ ?>