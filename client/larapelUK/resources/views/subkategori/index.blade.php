<!-- resources/views/subkategori/index.blade.php -->
@extends('layouts.app')

@section('content')
<style>
	.carousel-item img {
        height: 300px !important;
        object-fit: cover;
    }
    .carousel {
        width: 100vw !important;
    }
	.btnn {
		outline: 0;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		background: #0B5ED7;
		min-width: 150px;
		height: 52px;
		border: 0;
		border-radius: 4px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, .4);
		box-sizing: border-box;
		padding: 16px 20px;
		color: #fff;
		font-size: 15px;
		font-weight: 600;
		letter-spacing: 1.2px;
		text-transform: uppercase;
		overflow: hidden;
		cursor: pointer;
	}

	.btnn:hover {
		opacity: .55;
	}

	.btnn .animation {
		border-radius: 100%;
		animation: ripple 0.6s linear infinite;
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

	@keyframes ripple {
		0% {
			box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1);
		}

		100% {
			box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1), 0 0 0 80px rgba(255, 255, 255, 0);
		}
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
					src="{{ asset('images/korosel1.jpg') }}"
					class="d-block w-100"
					alt="..."
					style=""
				/>
			</div>
			<div class="carousel-item" data-bs-interval="2000">
				<img
					src="{{ asset('images/korosel2.jpg') }}"
					class="d-block w-100"
					alt="..."
					style=""
				/>
			</div>
			<div class="carousel-item" data-bs-interval="2000">
				<img
					src="{{ asset('images/korosel3.jpg') }}"
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

{{-- <div>
	<a href="{{ route('kategori-destinasi.index') }}">
		<button class="btnn mt-3" style="font-size: 20px">
			<i class="animation">
				<img src="https://img.icons8.com/?size=40&id=65a5j6IY0Vy2&format=png&color=FFFFFF" alt="">
			</i>
			BACK
	</button>
	</a>
</div> --}}



<div class="container">
	<section class="">
		<div class="container py-4 px-5">
			<div>
				<a href="{{ route('kategori-destinasi.index') }}">
					<button class="btnn mt-3">
						<i class="animation">
							<img src="https://img.icons8.com/?size=40&id=65a5j6IY0Vy2&format=png&color=FFFFFF" alt="">
						</i>
						BACK
				</button>
				</a>
			</div>
			<div class="h1 text-center text-dark" id="pageHeaderTitle">Tempat Destinasi</div>
			@foreach($subkategoris as $subkategori)
			<article class="postcard light blue">
				<a class="postcard__img_link" href="#">
					@if($subkategori->image)
							{{-- <img class="postcard__img" src="{{ asset('storage' . $subkategori->image) }}" alt="SubImage" /> --}}
							<img class="postcard__img" src="http://127.0.0.1:5000{{ $subkategori->image }}" alt="SubImage" />
					@else
							<img src="{{ asset('storage/images/no-image.jpg') }}" class="card-img-top card-img" alt="No Image">
					@endif
				</a>
				<div class="postcard__text t-dark">
					<h1 class="postcard__title blue"><a href="#">{{ $subkategori->nama_subkategori }}</a></h1>
					<div class="postcard__bar"></div>
					<div class="postcard__preview-txt">{{ $subkategori->deskripsi }}</div>
					<ul class="postcard__tagbox">
						<a href="{{ route('paket.index', $subkategori->id) }}">
							<button class="animated-button">
								<svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
									></path>
								</svg>
								<span class="text">Lihat Paket Destinasi</span>
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
			@endforeach
		</div>
		<script src="https://kit.fontawesome.com/c0ad9aaa27.js" crossorigin="anonymous"></script>
	</section>
</div>

@endsection
