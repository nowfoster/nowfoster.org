import { fireEvent, render, screen } from "@testing-library/react"
import useUrlQuery from "./useUrlQuery"

const mockReplace = jest.fn()

jest.mock("next/router", () => ({
  useRouter() {
    return {
      replace: mockReplace,
    }
  },
}))

beforeEach(() => {
  jest.clearAllMocks()

  delete (window as any).location

  window.location = {
    origin: "foo",
    pathname: "bar",
    search: "",
  } as Location
})

const MockComponent = () => {
  const [state, setState] = useUrlQuery<string>("foo", "bar")
  return (
    <>
      <button onClick={() => setState("der")} />
      <p>{state}</p>
    </>
  )
}

const MockComponent2 = () => {
  const [state, setState] = useUrlQuery<string>("foo", "bar")
  return (
    <>
      <button onClick={() => setState("")} />
      <p>{state}</p>
    </>
  )
}

describe("useUrlQuery", () => {
  it.skip("sets an initial value if one isn't stored", () => {
    render(<MockComponent />)
    expect(screen.getByText("bar"))
  })

  it.skip("updates state in the url", () => {
    render(<MockComponent />)
    fireEvent.click(screen.getByRole("button"))
    expect(screen.getByText("der"))
    expect(mockReplace).toBeCalledWith("foobar?foo=der", undefined, {
      scroll: false,
    })
  })

  it.skip("can restore an initial value from the url", async () => {
    window.location.search = "?foo=test"
    render(<MockComponent />)
    expect(screen.getByText("test"))
  })

  it.skip("doesn't update the url if there is nothing to update", () => {
    window.location.search = "?foo=der"
    render(<MockComponent />)
    fireEvent.click(screen.getByRole("button"))
    expect(mockReplace).not.toBeCalled()
  })

  it.skip("cleans falsy values out from the url", () => {
    render(<MockComponent2 />)
    fireEvent.click(screen.getByRole("button"))
    expect(mockReplace).toBeCalledWith("foobar?", undefined, {
      scroll: false,
    })
  })
})
