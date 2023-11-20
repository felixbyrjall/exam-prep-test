import renderer, { act } from "react-test-renderer";
import { ListMovies } from "../components/movies/listMovies";
import { MoviesContext } from "../components/movies/moviesContext";
import { AddMovies } from "../components/movies/addMovies";
describe("movies react application", () => {
  it("shows loading screen", () => {
    const component = renderer.create(<ListMovies />);
    expect(component).toMatchSnapshot();
  });

  it("shows loaded movies", async () => {
    // snapshot test
    const fetchMovies = () => [
      { title: "Jest, the test", _id: 1 },
      { title: "Bob, the builder", _id: 2 },
    ];
    let component;
    await act(async () => {
      component = renderer.create(
        <MoviesContext.Provider value={{ fetchMovies }}>
          <ListMovies />
        </MoviesContext.Provider>,
      );
    });

    expect(component).toMatchSnapshot();
  });

  it("add a new movie", async () => {
    // A test that adds a new movie
    const postNewMovie = jest.fn();
    const component = renderer.create(
      <MoviesContext.Provider value={{ postNewMovie }}>
        <AddMovies />
      </MoviesContext.Provider>,
    );
    await act(async () => {
      component.root.findByType("input").props.onChange({
        target: { value: "My test movie" },
      });
    });
    await act(async () => {
      component.root.findByType("form").props.onSubmit({
        preventDefault() {},
      });
    });

    expect(postNewMovie).toBeCalledWith({
      title: "My test movie",
    });
  });
});
