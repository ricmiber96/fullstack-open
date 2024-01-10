import { fireEvent, render } from "@testing-library/react"
import BlogForm from "../../src/components/BlogForm"
import '@testing-library/jest-dom/'
import { act } from "react-dom/test-utils";

jest.mock('../../src/services/blogs.js');

describe('Blog Form', () => {

    let component 
    const createBlog = jest.fn()

    beforeEach(() => {
        component = render(<BlogForm createBlog={createBlog} />)
    })

    test('Rendering the form correctly', () => {
        const form = component.container.querySelector('form')
        expect(form).toBeDefined()
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const addBtn = component.getByText('Create')
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeDefined()
        expect(addBtn).toBeDefined()

        expect(title).toHaveValue('')
        expect(author).toHaveValue('')
        expect(url).toHaveValue('')
    })



    // test('Adding a new blog', async() => {
  
    //     const title = component.container.querySelector('#title')
    //     const author = component.container.querySelector('#author')
    //     const url = component.container.querySelector('#url')
    //     const form = component.container.querySelector('form')


    //     fireEvent.change(title, {
    //         target: { value: 'React patterns' }
    //     })
    //     fireEvent.change(author, {
    //         target: { value: 'Michael Chan' }
    //     })
    //     fireEvent.change(url, {
    //         target: { value: 'https://reactpatterns.com/' }
    //     })

    //     expect(title).toHaveValue('React patterns')
    //     expect(author).toHaveValue('Michael Chan')
    //     expect(url).toHaveValue('https://reactpatterns.com/')

    //     fireEvent.submit(form)

    //     expect(createBlog.mock.calls).toHaveLength(1)
    //     expect(createBlog.mock.calls[0][0].title).toBe('React patterns')
    //     expect(createBlog.mock.calls[0][0].author).toBe('Michael Chan')
    //     expect(createBlog.mock.calls[0][0].url).toBe('https://reactpatterns.com/')
    // })

    test('Adding a new blog', async () => {
        // Mock the localStorage getItem method
        const localStorageMock = {
          getItem: jest.fn(() => JSON.stringify({ token: 'mockedToken' })),
        };
        global.localStorage = localStorageMock;
        // Fill in the form
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')
        fireEvent.change(title, { target: { value: 'test title' } });
        fireEvent.change(author, { target: { value: 'test author' } });
        fireEvent.change(url, { target: { value: 'test url' } });
        // Check that the form values were updated
        // expect(title).toHaveValue('test title');
        // expect(author).toHaveValue('test author');
        // expect(url).toHaveValue('test url');

          // Submit the form
          await act (async() => {
            fireEvent.submit(form);
          })

        // Check that the createBlog function was called
        expect(createBlog.mock.calls).toHaveLength(1);

    })

  
        
    

})
