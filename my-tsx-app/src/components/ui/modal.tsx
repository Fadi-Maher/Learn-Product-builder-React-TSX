import {    Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'
// import Button from './button';

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactNode;
}

function Modal({ isOpen, closeModal, title, children }: IProps) {
  return (
    
      <AnimatePresence>
        {isOpen && (
          <Dialog static open={isOpen} onClose={closeModal} className="relative z-50">
            <div className='backdrop-blur-sm fixed inset-0' aria-hidden="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-white p-12"
              >
                <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                {children}
                {/* <div className="flex gap-4">
                  <Button className="bg-indigo-900 p-2 rounded" onClick={closeModal}>Cancel</Button>
                  <Button className="bg-indigo-900 p-2 rounded" onClick={closeModal}>Confirm</Button>
                </div> */}
              </DialogPanel>
            </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
  
  );
}

export default Modal;
