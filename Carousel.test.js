import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import { describe, it } from "node:test";
import Card from "./Card.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


describe('Carousel Component Snapshot', () => {
  it('renders correctly with given props', () => {
    const images = [
      { caption: 'img1', src: 'img1 url' },
      { caption: 'img2', src: 'img2 url' }
    ];
    const title = 'Carousel test';
    const { asFragment } = render(<Carousel imgs={images} title={title} />)
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Card comp snapshot', () => {
  it('renders correctly with given props', () => {
    const props = {
      caption: 'seashell by the seashore',
      src: 'img1 url',
      currNum: 1,
      totalNum: 3
    };
    const { asFragment } = render(<Card {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Carousel component smoke test', () => {
  it('renders without crashing', () => {
    const images = [
      { caption: 'img1', src: 'img1 url' },
      { caption: 'img2', src: 'img2 url' }
    ]
    const title = 'test carousel';
    render(<Carousel images={images} title={title} />)
  })
});

describe('Card comp snapshot', () => {
  it('renders correclt without crashing', () => {
    const props = {
      caption: 'seashell by the seashore',
      src: 'img1 url',
      currNum: 1,
      totalNum: 3
    };
    render(<Card {...props} />)
  });
});

////////////Failing Tests

describe('failing carousel test', () => {
  it('should move the first image when left arrow is clicked', () => {
    const images = [
      { caption: 'img1', src: 'img1-url' },
      { caption: 'img2', src: 'img2-url' }
    ];
    const title = 'test carousel';

    const { getByClassName } = render(<Carousel images={images} title={title} />)

    const rightArrow = getByClassName('bi bi-arrow-right-circle');
    fireEvent.click(rightArrow);

    const leftArrow = getByClassName('bi bi-arrow-left-circle');
    fireEvent.click(leftArrow);

    const card = getByClassName('Card');
    expect(card.props.currNum).toBe(1)
  });
});

describe('carousel failing arrow test', () => {
  it('should hide the left arrow when displaying the first image and hide the right arrow on the last image', () => {
    const images = [
      { caption: 'img1', src: 'img1-url' },
      { caption: 'img2', src: 'img2-url' }
    ];
    const title = 'test carousel'
    const { getByTestId, queryByTestId } = render(<Carousel images={images} title={title} />)

    expect(queryByTestId('left-arrow')).toBeNull();

    const rightArrow = getByTestId('right-arrow');
    fireEvent.click(rightArrow)

    expect(queryByTestId('right-arrow')).toBe();
  })
})