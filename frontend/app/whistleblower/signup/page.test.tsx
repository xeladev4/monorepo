import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WhistleblowerSignupPage from './page'

// Mock the API module
vi.mock('@/lib/api/whistleblowerApplications', () => ({
  submitWhistleblowerApplication: vi.fn(),
  isApiError: vi.fn((error) => error?.statusCode !== undefined),
  getValidationErrors: vi.fn(),
}))

import { submitWhistleblowerApplication } from '@/lib/api/whistleblowerApplications'

type MockSubmitApplication = Mock<typeof submitWhistleblowerApplication>

describe('WhistleblowerSignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders step 1 initially', () => {
    render(<WhistleblowerSignupPage />)
    
    expect(screen.getByText('Become a Whistleblower')).toBeInTheDocument()
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Current Address (Where you live)')).toBeInTheDocument()
  })

  it('validates required fields in step 1', async () => {
    render(<WhistleblowerSignupPage />)
    
    const continueButton = screen.getByText('Continue to Verification')
    fireEvent.click(continueButton)
    
    await waitFor(() => {
      expect(screen.getByText('Full name is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<WhistleblowerSignupPage />)
    
    const emailInput = screen.getByLabelText('Email Address')
    await userEvent.type(emailInput, 'invalid-email')
    
    const continueButton = screen.getByText('Continue to Verification')
    fireEvent.click(continueButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('proceeds to step 2 when step 1 is valid', async () => {
    render(<WhistleblowerSignupPage />)
    
    // Fill step 1
    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Phone Number'), '+2348123456789')
    await userEvent.type(screen.getByLabelText('Current Address (Where you live)'), '123 Test St')
    
    const continueButton = screen.getByText('Continue to Verification')
    fireEvent.click(continueButton)
    
    await waitFor(() => {
      expect(screen.getByText('Verify Your Identity')).toBeInTheDocument()
    })
  })

  it('validates social profile URLs', async () => {
    render(<WhistleblowerSignupPage />)
    
    // Fill step 1 first
    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Phone Number'), '+2348123456789')
    await userEvent.type(screen.getByLabelText('Current Address (Where you live)'), '123 Test St')
    fireEvent.click(screen.getByText('Continue to Verification'))
    
    await waitFor(() => {
      expect(screen.getByText('Verify Your Identity')).toBeInTheDocument()
    })
    
    // Try to submit without URLs
    const submitButton = screen.getByText('Submit for Review')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('LinkedIn profile is required')).toBeInTheDocument()
    })
  })

  it('submits application successfully', async () => {
    const mockResponse = {
      success: true,
      application: {
        applicationId: 'test-app-id-123',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+2348123456789',
        address: '123 Test St',
        linkedinProfile: 'https://linkedin.com/in/johndoe',
        facebookProfile: 'https://facebook.com/johndoe',
        instagramProfile: 'https://instagram.com/johndoe',
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      message: 'Application submitted successfully',
    }
    const mockSubmit = submitWhistleblowerApplication as MockSubmitApplication
    mockSubmit.mockResolvedValue(mockResponse)
    
    render(<WhistleblowerSignupPage />)
    
    // Fill step 1
    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Phone Number'), '+2348123456789')
    await userEvent.type(screen.getByLabelText('Current Address (Where you live)'), '123 Test St')
    fireEvent.click(screen.getByText('Continue to Verification'))
    
    await waitFor(() => {
      expect(screen.getByText('Verify Your Identity')).toBeInTheDocument()
    })
    
    // Fill step 2
    await userEvent.type(screen.getByLabelText('LinkedIn Profile URL'), 'https://linkedin.com/in/johndoe')
    await userEvent.type(screen.getByLabelText('Facebook Profile URL'), 'https://facebook.com/johndoe')
    await userEvent.type(screen.getByLabelText('Instagram Profile URL'), 'https://instagram.com/johndoe')
    
    const submitButton = screen.getByText('Submit for Review')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(submitWhistleblowerApplication).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+2348123456789',
        address: '123 Test St',
        linkedinProfile: 'https://linkedin.com/in/johndoe',
        facebookProfile: 'https://facebook.com/johndoe',
        instagramProfile: 'https://instagram.com/johndoe',
      })
    })
    
    await waitFor(() => {
      expect(screen.getByText('Application Submitted!')).toBeInTheDocument()
    })
    
    // Check that application ID is displayed
    expect(screen.getByText('test-app-id-123')).toBeInTheDocument()
  })

  it('shows error state on submission failure', async () => {
    const mockError = new Error('Email already registered') as Error & { statusCode: number; apiError?: { error: { message: string } } }
    mockError.statusCode = 409
    mockError.apiError = { error: { message: 'An application with this email already exists' } }
    const mockSubmit = submitWhistleblowerApplication as MockSubmitApplication
    mockSubmit.mockRejectedValue(mockError)
    
    render(<WhistleblowerSignupPage />)
    
    // Fill step 1
    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Phone Number'), '+2348123456789')
    await userEvent.type(screen.getByLabelText('Current Address (Where you live)'), '123 Test St')
    fireEvent.click(screen.getByText('Continue to Verification'))
    
    await waitFor(() => {
      expect(screen.getByText('Verify Your Identity')).toBeInTheDocument()
    })
    
    // Fill step 2
    await userEvent.type(screen.getByLabelText('LinkedIn Profile URL'), 'https://linkedin.com/in/johndoe')
    await userEvent.type(screen.getByLabelText('Facebook Profile URL'), 'https://facebook.com/johndoe')
    await userEvent.type(screen.getByLabelText('Instagram Profile URL'), 'https://instagram.com/johndoe')
    
    const submitButton = screen.getByText('Submit for Review')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Submission Failed')).toBeInTheDocument()
      expect(screen.getByText('An application with this email already exists')).toBeInTheDocument()
    })
    
    // Check that try again button is available
    expect(screen.getByText('Try Again')).toBeInTheDocument()
  })

  it('shows loading state while submitting', async () => {
    // Delay the resolution to show loading state
    const mockSubmit = submitWhistleblowerApplication as MockSubmitApplication
    mockSubmit.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )
    
    render(<WhistleblowerSignupPage />)
    
    // Fill step 1
    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Phone Number'), '+2348123456789')
    await userEvent.type(screen.getByLabelText('Current Address (Where you live)'), '123 Test St')
    fireEvent.click(screen.getByText('Continue to Verification'))
    
    await waitFor(() => {
      expect(screen.getByText('Verify Your Identity')).toBeInTheDocument()
    })
    
    // Fill step 2
    await userEvent.type(screen.getByLabelText('LinkedIn Profile URL'), 'https://linkedin.com/in/johndoe')
    await userEvent.type(screen.getByLabelText('Facebook Profile URL'), 'https://facebook.com/johndoe')
    await userEvent.type(screen.getByLabelText('Instagram Profile URL'), 'https://instagram.com/johndoe')
    
    const submitButton = screen.getByText('Submit for Review')
    fireEvent.click(submitButton)
    
    // Check for loading state
    await waitFor(() => {
      expect(screen.getByText('Submitting Your Application...')).toBeInTheDocument()
    })
  })
})
